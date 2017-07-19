app.directive('gitHubSearch', ['$timeout', 'searchApi', function($timeout, searchApi){
  return {
    restrict: 'AE',
    templateUrl: '../../templates/search.html',
    link: function(vm, elem, attrs, modelCtrl){

      vm.term = null;
      vm.message = "You must enter a search term";
      vm.error = false;


      vm.findRepos = function(term){
        if(!term){
          vm.error = true;
          $timeout(function(){
            vm.error = false;
          }, 3000)
          return
        }

        searchApi.get(term).then(function(resp){
          //do some stuff here
        });

      
        vm.term = null;
      }
      
    }
  }
}]);