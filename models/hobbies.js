'use strict';

var mongoose = require('mongoose');

var hobbiesSchema = new mongoose.Schema({
  hobbiesName: {type: String, match: /[^\n]+/},
  description: String,
  picture: String
});

module.exports = mongoose.model('Hobbies', hobbiesSchema);
