app.service('searchApi', ['$http', '$log', function($http, $log){

  var GHApi = {
    get: function(params){
      return $http.get('https://api.github.com/search/repositories?q=' + params).then(function(response){
        return response.data;
      }).catch(function(err){
        $log.error("user: get", err);
      });
    }
  };

  return GHApi

}]);
