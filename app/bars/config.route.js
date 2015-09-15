(function (){
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/bars',{
        templateUrl: 'bars.html',
        controller: 'Bars',
        controllerAs: 'vm'
      });
  }


})