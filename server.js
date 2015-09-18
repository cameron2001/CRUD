// var htutil = require('./htutil');

/* Server Setup */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port;

var app = express();
/* Databse Connection */
if (process.argv.indexOf('dev') > -1){
  port = 8126;
  mongoose.connect('mongodb://localhost/crudexample');
}else{
   port = process.env.PORT;
   mongoose.connect('mongodb://cameron:cameron@ds042898.mongolab.com:42898/cameron-lm');
}

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser());
app.set('view engine', 'ejs');
require('./routes/routes.js')(app);

var server = app.listen(port, function() {
  console.log("Listening to http://localhost:" + port);
});

var db = mongoose.connection;
// Hi Cameron
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});
