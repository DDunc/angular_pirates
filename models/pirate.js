'use strict';

var mongoose = require('mongoose');

var pirateSchema = new mongoose.Schema({
  pirateName: {type: String},
  pirateBody: {type: String},
  hobbies: {type: String},
  picture: {type: String, default: "http://www.cwu.edu/~davisdani/pirate.jpg"}
});

module.exports = mongoose.model('Pirate', pirateSchema);
