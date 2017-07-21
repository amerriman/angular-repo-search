var app = angular.module('githubSearch', [])
  .controller('mainCtrl',['$scope', '$timeout', '$log', 'searchApi', function($scope, $timeout, $log, searchApi ){
    var vm = this;
    vm.term = null;
    vm.message = "You must enter a search term";
    vm.error = false;
    vm.sort = "score";
    vm.searchTerm = null;
    vm.noItems = false;
    vm.noItemMessage = "";

    /**
     * Function to set a sort preference
     * @param sortChoice [string]
     */
    vm.setSort = function(sortChoice){
      if(!sortChoice){
        $log.debug('No sort choice');
        return
      }
      vm.sort = sortChoice
    };

    /**
     * Function to clear previously displayed items
     */
    function clearItems(){
      vm.items = null;
      vm.noItems = false;
      vm.noItemMessage = "";
    }

    /**
     * Function to set a sort preference
     * @param term [string]
     * @param sort [string]
     */
    vm.findRepos = function(term, sort){

      clearItems();

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
        if(resp.items.length > 0){
          vm.items = resp.items;
        } else {
          vm.noItems = true;
          vm.noItemMessage = "No repositories matched your search."
        }
      }).catch(function(err){
        vm.noItems = true;
        vm.noItemMessage = "Ooops.  Something went wrong.";
        $log.error("findRepos", err);
      });
      vm.term = null;
    }

  }]);

