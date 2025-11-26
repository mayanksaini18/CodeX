require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const quizRoutes = require('./routes/quiz');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Hello World');
})
// routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb+srv://mayanksaini0416_db_user:%40Mayank0416@cluster0.v0rdlpc.mongodb.net/codex';

mongoose.connect(MONGO)
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server listening', PORT));
  })
  .catch(err => console.error(err));
