const mongoose = require('mongoose');

const BookmarkSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: new Date()
  },
  tags: [],
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
