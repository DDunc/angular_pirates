module.exports = function(app) {
  app.factory('Shanty', [function() {
    var Shanty = {};

    Shanty.sing = function(pirateName) {
      var haul = "Hey don't you see that black cloud a'risin? Way haul away, we'll "
      + "haul away " + pirateName + "!"
      alert(haul);
    };

    return function() {
      return Shanty;
    };

  }]);
};