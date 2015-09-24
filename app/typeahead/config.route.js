(function (){
  'use strict';

  angular
    .module('app.typeahead')
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/typeahead', {
        templateUrl: 'app/typeahead/typeahead.html',
        controller: 'typeahead',
        controllerAs: 'vm'
      });
  }

})();