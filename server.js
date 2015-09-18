// var htutil = require('./htutil');

/* Server Setup */
var express = require('express');
var bodyParser = require('body-parser');

var port;

var app = express()

port = process.env.PORT;

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser());
app.set('view engine', 'ejs');
require('./routes/routes.js')(app);

var server = app.listen(port, function() {
  console.log("Listening to http://localhost:" + port);
});

/* Database connection */
var mongoose = require('mongoose');
mogoose.connect('mongodb://cameron:cameron@ds042898.mongolab.com:42898/cameron-lm');


var db = mongoose.connection;
// Hi Cameron
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});
