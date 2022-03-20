const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema(
  {
    //from whom the friend request was sent
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    //to which user the friend request was sent
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const FriendShip = mongoose.model('FriendShip', friendshipSchema);

module.exports = FriendShip;
