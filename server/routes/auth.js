const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

router.post('/signup', asyncHandler(async (req,res)=>{
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash: hash });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
}));

router.post('/login', asyncHandler(async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({ message: 'Invalid' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
}));

module.exports = router;
