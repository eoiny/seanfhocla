(function (){
  'use strict';

  angular
    .module('app.pattern')
    .controller('pattern', pattern);

  pattern.$inject = ['$scope', 'd3Service'];

  function pattern($scope, d3Service) {
    d3Service.d3().then(function (d3) {
      d3.json('app/content/proverbs.json', function (err, data) {
        if (err) {
          throw err;
        }

        $scope.data = data;
        $scope.$apply();
      });
    });
  }
})();
