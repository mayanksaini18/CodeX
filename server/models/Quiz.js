const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ['mcq','multi','short'], default: 'mcq' },
  options: [{ id: String, text: String }],
  correct: [String], // option ids
  marks: Number
});

const quizSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  questions: [questionSchema],
  timeLimitSeconds: Number,
  shuffle: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
