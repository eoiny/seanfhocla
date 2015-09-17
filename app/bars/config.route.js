(function (){
  'use strict';

  angular
    .module('app.bars')
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/bars',{
        templateUrl: 'app/bars/bars.html'
       // controller: 'bars',
       // controllerAs: 'vm'
      });
  }

})();