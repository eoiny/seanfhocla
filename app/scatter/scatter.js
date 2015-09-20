(function (){
  'use strict';

  angular
    .module('app.scatter')
    .controller('scatter', scatter);

  scatter.$inject = ['$scope', 'd3Service'];


    function scatter($scope, d3Service) {
      d3Service.d3().then(function (d3) {
        var parseDate = d3.time.format("%d-%b-%y").parse;
        d3.json('app/content/data1.json', function (err, data) {
          if (err) {
            throw err;
          }

          $scope.data2 = data;

          $scope.data2.forEach(function (d) {
            //console.log(d);
            d.date = parseDate(d.date);
            d.close = +d.close;
            //console.log(d);
          });

          $scope.$apply();
        });


        /*$scope.data2 = [
          {"date": "4-Apr-12", "close": 34},
          {"date": "5-Apr-12", "close": 45},
          {"date": "6-Apr-12", "close": 37},
          {"date": "7-Apr-12", "close": 56},
          {"date": "8-Apr-12", "close": 50},
          {"date": "9-Apr-12", "close": 77}
        ];

        $scope.data2.forEach(function (d) {
          console.log(d);
          d.date = parseDate(d.date);
          d.close = +d.close;
        });*/

      });
    }
})();