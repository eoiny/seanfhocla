(function (){
  'use strict';

  angular
    .module('app.pattern')
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/pattern', {
        templateUrl: 'app/pattern/pattern.html',
        controller: 'pattern',
        controllerAs: 'vm'
      });
  }
})();