(function (){
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/pattern',{
        templateUrl: 'pattern.html',
        controller: 'Pattern',
        controllerAs: 'vm'
      });
  }


})