(function (){
  'use strict';

  angular
    .module('app.scatter')
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/scatter', {
        templateUrl: 'app/scatter/scatter.html',
        controller: 'scatter',
        controllerAs: 'vm'
      });
  }

})();