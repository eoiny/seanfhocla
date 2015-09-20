(function() {
  'use strict';

  angular
    .module('app.scatter')
    .directive('scatter',scatter);

  scatter.$inject = ['$window', '$timeout','d3Service'];

  function scatter($window, $timeout ,d3Service) {
    return {
      //restrict: 'EA',
      //scope: {},
      restrict: 'E',
      scope: { data: '=' },
      link: function (scope, element, attrs) {
        d3Service.d3().then(function (d3) {
          var margin = {top: 10, right: 10, bottom: 5, left: 20};

          var svg = d3.select(element[0])
            .append('svg')
            .style('width', '100%');

          // Browser onresize event
          window.onresize = function () {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render(scope.data);
          });

          scope.$watch('data', function(){
            scope.render(scope.data);
          }, true);

          //*****
          scope.render = function (data){
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            var width = d3.select(element[0])[0][0].offsetWidth - margin.left - margin.right,
              height = 400 - margin.top - margin.bottom;

            /*var margin = {top: 20, right: 20, bottom: 30, left: 50},
              width = 600 - margin.left - margin.right,
              height = 700 - margin.top - margin.bottom;*/

            // var parseDate = d3.time.format("%d-%b-%y").parse;
            var parseDate = d3.time.format("%d-%b-%y").parse;

            var x = d3.time.scale()
              .range([0, width]);

            var y = d3.scale.linear()
              .range([height, 0]);

            var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom');

            var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left');

            var line = d3.svg.line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.close);
              });

            //svg = d3.select(element[0]).append('svg')
              svg.attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            // console.log(scope.data);


            x.domain(d3.extent(data, function (d) {
              return d.date;
            }));
            y.domain(d3.extent(data, function (d) {
              return d.close;
            }));

            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis);

            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis)
              .append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 6)
              .attr('dy', '.71em')
              .style('text-anchor', 'end')
              .text('Price ($)');

            svg.append('path')
              .datum(data)
              .attr('class', 'line')
              .attr('d', line);

            console.log(data);

          };





        });
      }
    };
  }


})();