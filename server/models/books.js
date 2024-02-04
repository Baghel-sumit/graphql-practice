const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  categories: String,
  authorId: String,
});

module.exports = mongoose.model('Books', bookSchema);