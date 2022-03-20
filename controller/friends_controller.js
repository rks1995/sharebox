const User = require('../models/user');
const FriendShip = require('../models/friendship');

const addFriend = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (user) {
      //create the friendship
      let isFriend = false;
      let friendship;

      //check if they are freinds
      let existingFriends = await FriendShip.findOne({
        from_user: req.user.id,
        to_user: req.params.id,
      });

      if (existingFriends) {
        isFriend = true;
      } else {
        //create a new friend
        friendship = await FriendShip.create({
          from_user: req.user.id,
          to_user: req.params.id,
        });

        //req.user -> person who send the request, user-> person who recieved the request
        req.user.friendships.push(friendship.id);
        user.friendships.push(friendship.id);
        req.user.save();
        user.save();
      }

      return res.status(200).json({
        message: 'Request Successfull',
        data: {
          isFriend: isFriend,
        },
      });
    }
  } catch (error) {
    console.log('Error in adding friend', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const removeFriend = async (req, res) => {
  try {
    let getFriendship;
    getFriendship = await FriendShip.findOne({
      from_user: req.user.id,
      to_user: req.params.id,
    });
    if (getFriendship == null) {
      getFriendship = await FriendShip.findOne({
        from_user: req.params.id,
        to_user: req.user.id,
      });
    }

    let user = await User.findById(req.params.id);
    let friendOfUser = await User.findById(req.user.id);
    //remove the user from the database of friendship

    await FriendShip.deleteOne(getFriendship);
    user.friendships.pull(getFriendship._id);
    friendOfUser.friendships.pull(getFriendship._id);
    user.save();
    friendOfUser.save();

    return res.status(200).json({
      message: 'Request Successfull!',
    });
  } catch (error) {
    console.log('Error in removing friend', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = { addFriend, removeFriend };
