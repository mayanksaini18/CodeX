const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  contentMarkdown: String,
  durationMinutes: Number,
  order: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  modules: [{ title: String, lessons: [lessonSchema] }],
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
