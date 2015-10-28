/*jshint -W083 */

var Pirate = require('./../models/pirate');
var Hobbies = require('./../models/hobbies');
var bodyParser = require('body-parser').json();
var express = require('express');
var handleError = require('./../lib/error_handler');

var router = module.exports = exports = express.Router();

router.get('/pirates', function (req, res) {
    Pirate.find({}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.get('/pirates/:id', function (req, res) {
    Pirate.find({_id: req.params.id}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.post('/pirates', bodyParser, function (req, res) {
    var newPirate = new Pirate(req.body);
    var hobbies = new Pirate(req.body.hobbies.split(' '));
    for (var i = 0; i < hobbies.length; i++) {
        var newHobbies = new Hobbies(hobbies[i]);
        newHobbies.save(function(err, data){
            if (err) return handleError(err, res);
        });
    }
    newPirate.save(function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.delete('/pirates/:id', function (req, res) {
    Pirate.remove({_id: req.params.id}, function (err) {
        if (err) return handleError(res, err);
        res.json({msg: req.params.id + ' deleted'});
    });
});
router.put('/pirates/:id', bodyParser, function (req, res) {
    var newPirate = req.body;
    Pirate.update({_id: req.params.id}, newPirate, function (err, data) {
        if (err) return handleError(res, err);
        res.json({link: '/pirates/' + req.params.id});
    });
});
router.get('/hobbie', bodyParser, function (req, res) {
    Hobbies.find({}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.get('/hobbie/:id', bodyParser, function (req, res) {
    Hobbies.find({_id: req.params.id}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
