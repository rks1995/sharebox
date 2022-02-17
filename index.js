const express = require('express');
const app = express();
const port = 8000;

//use express route
app.use('/', require('./route/index'));

//start server
app.listen(port, function (err) {
  if (err) {
    console.log('error connecting server');
    return;
  }
  console.log(`server is up and running at port ${port}`);
});
