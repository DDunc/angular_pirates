require(__dirname + '/../../app/js/client.js');
require('angular-mocks');

describe('pirates controller', function(){
  beforeEach(angular.mock.module('piratesApp'));
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should create the controller', function() {
    var controller = new $ControllerConstructor('PiratesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.pirates)).toBe(true);
  });

  describe('rest requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope;
      $ControllerConstructor('PiratesController', {$scope: $scope});
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request on getPirates', function() {
      $httpBackend.expectGET('/api/pirates').respond(200, [{'pirateName':'getBeard'}]);
      $scope.getPirates();
      $httpBackend.flush();
      expect($scope.pirates[0].pirateName).toBe('getBeard');
    });

    it('should make a POST request', function() {
      $httpBackend.expectPOST('/api/pirates', {'pirateName': "postBeard"}).respond(200, {'pirateName': "postBeard"});
      //$scope.clearNewPirate();
      $scope.createPirate({'pirateName': "postBeard"});
      $httpBackend.flush();
      console.log($scope.pirates);
      expect($scope.pirates[0].pirateName).toBe('postBeard');
    });

    it('should delete pirates', function() {
      $scope.pirates.push({_id: 1000, pirateName:'deleteBeard'});
      $httpBackend.expectDELETE('/api/pirates/1000').respond(200);
      $scope.deletePirate($scope.pirates[0]);
      $httpBackend.flush();
      expect($scope.pirates.length).toBe(0);
    });

    it('should update pirates', function() {
      $scope.pirates.push({_id: 1000, pirateName:'putBeard'});
      $httpBackend.expectPUT('/api/pirates/1000', {_id: 1000, pirateName:'putBeard', editing: false, pendingUpdate: true}).respond(200);
      $scope.updatePirate($scope.pirates[0]);
      $httpBackend.flush();
      expect($scope.pirates[0].pirateName).toBe('putBeard');
    });

  });
});
