module.exports = function(app) {
  app.controller('PiratesController',
      ['$scope', 'Resource', 'Shanty', function($scope, Resource, Shanty) {
    $scope.pirates = [];
    $scope.newPirate = {_id: 'new'};
    var resource = Resource();
    var shanty = Shanty();

    $scope.clearNewPirate = function() {
      $scope.newPirate = {_id: 'new'};
    };

    $scope.getPirates = function() {
      resource.getAll(function(err, data) {
        if (err) { return console.log(err); }
        $scope.pirates = data;
      });
    };

    $scope.createPirate = function(pirate) {
      delete pirate._id;
      resource.create(function(err, data) {
        if (err) { return console.log(err); }
        $scope.newPirate = {};
        $scope.pirates.push(data);
      }, pirate);
    };

    $scope.beginEdit = function(pirate) {
      pirate.oldName = pirate.pirateName;
      pirate.oldBody = pirate.pirateBody;
      pirate.oldHobbies = pirate.hobbies;
      pirate.editing = true;
    };

    $scope.cancelEdit = function(pirate) {
      pirate.pirateName = pirate.oldName;
      pirate.pirateBody = pirate.oldBody;
      pirate.hobbies = pirate.oldHobbies;
      pirate.editing = false;
    };

    $scope.updatePirate = function(pirate) {
      pirate.editing = false;
      pirate.pendingUpdate = true;
      resource.update(function(err, data) {
        if (err) { return console.log(err); }
        pirate.pendingUpdate = false;
      }, pirate);
    };

    $scope.sing = function(pirate){
      shanty.sing(pirate.pirateName);
    }

    $scope.deletePirate = function(pirate) {
      pirate.pendingDelete = true;
      resource.remove(function(err, data) {
        if (err) { return console.log(err); }
        pirate.pendingDelete = false;
        $scope.pirates.splice($scope.pirates.indexOf(pirate), 1);
      }, pirate);
    };

  }]);
};
