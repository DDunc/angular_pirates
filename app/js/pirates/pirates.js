module.exports = function(app) {
  require('./controllers/piratesController')(app);
  require('./directives/pirate_form_directive')(app);
};
