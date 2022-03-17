const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },

    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel',
    },

    onModel: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
