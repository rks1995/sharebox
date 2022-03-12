index = (req, res) => {
  return res.status(200).json({
    id: 1,
    username: 'Ratna',
    followers: [],
  });
};

module.exports = index;
