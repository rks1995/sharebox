const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
});

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;
