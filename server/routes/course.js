const router = require('express').Router();
const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');

// create course
router.post('/', asyncHandler(async (req,res)=>{
  const data = req.body;
  const course = await Course.create(data);
  res.json(course);
}));

// list courses
router.get('/', asyncHandler(async (req,res)=>{
  const courses = await Course.find().limit(50);
  res.json(courses);
}));

// get course
router.get('/:id', asyncHandler(async (req,res)=>{
  const course = await Course.findById(req.params.id);
  res.json(course);
}));

module.exports = router;
