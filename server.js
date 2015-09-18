// var htutil = require('./htutil');

/* Server Setup */
var express = require('express');
var bodyPasrer = require('body-parser');

var app = express()
var port = 80;
app.listen(port);
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyPasrer());
app.set('view engine', 'ejs');
require('./routes/routes.js')(app);

/* Database connection */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crudexample');
var db = mongoose.connection;
// Hi Cameron
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});

console.log("Listening to http://localhost:" + port);
