require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var url = require('url');
var students = require('./routes/students.js');
var api = require('./routes/api.js');
var bodyParser = require('body-parser');
var session = require('express-session');


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cscie31-shard-00-00-f3ezc.mongodb.net:27017,cscie31-shard-00-01-f3ezc.mongodb.net:27017,cscie31-shard-00-02-f3ezc.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=cscie31-shard-0&authSource=admin`);
var db = mongoose.connection;

db.on('error', (err)=>{console.error('connection error:${err}'); });
console.log('db connected');
var app = express();

var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: true});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', urlEncodedParser, students);
app.use('/api', jsonParser, api);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// catch 404 and forward to error handler
app.use((req, res, next)=>{
   res.status(404).end('Error: 404 - Page Not Found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
