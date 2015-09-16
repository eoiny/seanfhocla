(function (){
  'use strict';

  angular
    .module('app.scatter')
    .controller('scatter', scatter);

  scatter.$inject = ['$scope', '$window'];

  function scatter($scope, $window){
    $scope.awesomeThings = [
    ];
  }
})();