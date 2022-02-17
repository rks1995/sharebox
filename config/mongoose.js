const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sharebox_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open', function () {
  console.log('successfully connected to mongodb');
});

module.exports = db;
