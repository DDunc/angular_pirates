module.exports = function(app) {
  app.directive('pirateForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/pirates/directives/pirate_form_template.html',
      scope: {
        title: '@',
        buttonText: '@',
        pirate: '=',
        picture: '=',
        cancel: '&',
        save: '&'
      },
    };
  });
};
