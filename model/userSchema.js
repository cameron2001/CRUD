var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  title:String,
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});


var User = mongoose.model('User', userSchema);

module.exports = User;
