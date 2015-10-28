'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/pirates_test');

var router = require('./routes/pirates_routes');

app.use(express.static(__dirname + '/build'));
app.use('/api/', router);

var port = process.env.port || 3000;
app.listen(port, function(){
  console.log('server is listening on port: ' + port);
});
