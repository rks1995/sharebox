module.exports.home = function (req, res) {
  return res.send('<h1> hello from home controller');
};

module.exports.dashboard = function (req, res) {
  return res.send('<h1> hello from dashboard controller');
};
