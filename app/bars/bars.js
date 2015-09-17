(function (){
  'use strict';

  angular
    .module('app.bars')
    .controller('bars', bars);

  bars.$inject = ['$scope', '$window'];

  function bars($scope, $window){
    $scope.awesomeThings = [
    ];
  }
})();