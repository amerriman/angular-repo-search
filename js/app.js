var app = angular.module('githubSearch', [])
  .controller('mainCtrl',['$scope', '$timeout', 'searchApi', function($scope, $timeout, searchApi ){
    var vm = this;
    vm.term = null;
    vm.message = "You must enter a search term";
    vm.error = false;
    vm.sort = 'score';
    vm.searchTerm = null;

      vm.setSort = function(sortChoice){
      if(!sortChoice){
        $log.debug('No sort choice');
        return
      }
      vm.sort = sortChoice
    };

    vm.findRepos = function(term, sort){
      if(!term){
        vm.searchTerm = null;
        vm.error = true;
        $timeout(function(){
          vm.error = false;
        }, 3000);
        return
      }
      vm.searchTerm = term;
      var params = {};
      params.term = term;
      params.sort = sort;

      searchApi.get(params).then(function(resp){
        vm.items = resp;
        console.log(vm.items, "zees are the items")
      });
      vm.term = null;
    }
  }]);

