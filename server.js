const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 8000;

//use express layout
app.use(expressLayout);
// extract style and script from a sub-page to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use static files
app.use(express.static('./assets'));

//use express route
app.use('/', require('./route/index'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//start server
app.listen(port, function (err) {
  if (err) {
    console.log('error connecting server');
    return;
  }
  console.log(`server is up and running at http://localhost:${port}`);
});
