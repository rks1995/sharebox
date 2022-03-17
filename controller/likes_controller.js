const Post = require('../models/post');
const Comment = require('../models/comments');
const Like = require('../models/likes');

const likeController = async (req, res) => {
  try {
    let likeable;
    let isLiked = false;
    //demo route - likes/togglelikes/?id=sdfsfwef&type="Post"
    if (req.query.type == 'Post') {
      likeable = await Post.findById(req.query.id).populate('likes');
    } else {
      likeable = await Comment.findById(req.query.id).populate('likes');
    }

    //check if like already exist;
    let existingLike = await Like.findOne({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });

    if (existingLike) {
      isLiked = true;
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
    } else {
      //create a new like
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.status(200).json({
      data: {
        isLiked: isLiked,
      },
      message: 'Request successfull!',
    });
  } catch (error) {
    console.log('Error in liking post', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  likeController,
};
