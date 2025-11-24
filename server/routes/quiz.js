const router = require('express').Router();
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const asyncHandler = require('express-async-handler');

router.post('/', asyncHandler(async (req,res)=>{
  const q = await Quiz.create(req.body);
  res.json(q);
}));

router.get('/:id', asyncHandler(async (req,res)=>{
  const q = await Quiz.findById(req.params.id);
  res.json(q);
}));

// submit attempt
router.post('/:id/attempt', asyncHandler(async (req,res)=>{
  const quiz = await Quiz.findById(req.params.id);
  const { userId, answers, duration } = req.body;
  // naive scoring
  let score = 0;
  const detail = quiz.questions.map(qItem => {
    const ans = answers.find(a => a.questionId === qItem._id.toString());
    const correctIds = qItem.correct.map(String);
    const isCorrect = ans ? (Array.isArray(ans.response)
      ? ans.response.every(r => correctIds.includes(r)) && ans.response.length===correctIds.length
      : correctIds.includes(String(ans.response)))
      : false;
    if(isCorrect) score += (qItem.marks || 1);
    return { questionId: qItem._id, isCorrect, response: ans ? ans.response : null };
  });

  const attempt = await Attempt.create({ userId, quizId: quiz._id, answers: detail, score, duration });
  res.json({ attempt, score });
}));

module.exports = router;
