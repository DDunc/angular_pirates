require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('piratesApp'));
  var resource;
  var $httpBackend;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    resource = Resource();
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/pirates').respond(200,
      [{pirateBody: 'test pirate', _id: 1}]);
    resource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should make a post request', function() {
    $httpBackend.expectPOST('/api/pirates',
      {pirateBody: 'test'}).respond(200, {pirateBody: 'test'});
    resource.create(function(err, data) {
      expect(err).toBe(null);
      expect(data.pirateBody).toBe('test');
    }, {pirateBody: 'test'});
    $httpBackend.flush();
  });

  it('should make a put request', function() {
    $httpBackend.expectPUT('/api/pirates/1',
      {pirateBody: 'test', _id: 1}).respond(200);
    resource.update(function(err, data) {
      expect(err).toBe(null);
    }, {pirateBody: 'test', _id: 1});
    $httpBackend.flush();
  });

  it('should make a delete request', function() {
    $httpBackend.expectDELETE('/api/pirates/1').respond(200);
    resource.remove(function(err, data) {
      expect(err).toBe(null);
    }, {pirateBody: 'test', _id: 1});
    $httpBackend.flush();
  });
});
