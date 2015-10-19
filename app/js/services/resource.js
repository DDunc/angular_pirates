function handleError(callback) {
  return function(res) {
    callback(res);
  };
}

function handleSuccess(callback) {
  return function(res) {
    callback(null, res.data);
  };
}

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = {};

    Resource.getAll = function(callback) {
      $http.get('/api/pirates')
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.create = function(callback, pirate) {
      $http.post('/api/pirates', pirate)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.remove = function(callback, pirate) {
      $http.delete('/api/pirates/' + pirate._id)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.update = function(callback, pirate) {
      $http.put('/api/pirates/' + pirate._id, pirate)
        .then(handleSuccess(callback), handleError(callback));
    };

    return function() {
      return Resource;
    };

  }]);
};
