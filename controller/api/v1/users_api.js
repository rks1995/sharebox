const jwt = require('jsonwebtoken');

const User = require('../../../models/user');

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.status(404).json({
        message: 'Invalid user or password',
      });
    }

    return res.status(200).json({
      message: 'Signed in successfully, here is your token keep it safe!',
      data: {
        token: jwt.sign(user.toJSON(), 'secret', { expiresIn: '100000' }),
      },
    });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
