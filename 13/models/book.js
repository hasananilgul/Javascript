const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String,
  unique: true,
  required: true },
  writtenBy: String,
  inside: String,
  holderTime: Number,
  holderBy: String,
  deletedAt: Date,
  deletedBy: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);
