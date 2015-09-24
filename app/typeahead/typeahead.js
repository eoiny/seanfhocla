(function (){
  "use strict";

  angular
    .module('typeahead.app')
    .controller('typeahead', typeahead);

  typeahead.$inject = ['$scope', 'd3Service'];


  function typeahead($scope, d3Service) {
    d3Service.d3().then(function (d3) {
      d3.json('app/content/topic.json', function (err, data) {
        if (err) {
          throw err;
        }

        $scope.items = data;
        $scope.$apply();
        $scope.topic = '';
        $scope.onTopicSelected = function(){
          console.log('selected='+$scope.topic);
        };

      });
    });
  }

})();


