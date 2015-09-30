(function (){
  "use strict";

  angular
    .module('app.typeahead')
    .controller('typeahead', typeahead);

  typeahead.$inject = ['$scope', 'd3Service'];


  function typeahead($scope, d3Service) {
    d3Service.d3().then(function (d3) {
      d3.json('app/content/subjects.json', function (err, data) {
        if (err) {
          throw err;
        }
        $scope.selectedData = null;
        $scope.datas = data;
        $scope.onSelect = function(selection) {
          console.log(selection);
          $scope.selectedData = selection;
        };

        $scope.clearInput = function() {
          $scope.$broadcast('typeahead:clearInput');
        };

        $scope.$apply();
        //console.log($scope.datas);
       // $scope.name="";
       // $scope.onItemSelected=function() {
        //  console.log('selected=' + $scope.name);
       // };
        //console.log($scope.items)

      });
    });
  }
})();


