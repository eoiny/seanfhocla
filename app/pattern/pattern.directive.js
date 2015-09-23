(function (){
  'use strict';

  angular
    .module('app.pattern')
    .directive('pattern',pattern);

  pattern.$inject = ['$window', '$timeout', 'd3Service'];

  function pattern($window, $timeout, d3Service) {
    return {
      restrict: 'E',
      scope: {data: '='},
      link: function(scope, element, attrs){
        d3Service.d3().then(function (d3){
          var margin = {top: 30, right: 30, bottom: 30, left: 30};
          var numPoints = 500;

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
            //svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) {return;}

            var width = d3.select(element[0])[0][0].offsetWidth - margin.left - margin.right,
              height = 600 - margin.top - margin.bottom;

            //var g = svg.append("g");
            var g = svg.attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .append('g');

            var randPoint = function(min, max) {
              return Math.floor(Math.random() * (max-min)) + min;
            };

            var points = function(numPoints) {
              var data = [];
              for (var i=0; i < numPoints; i++) {
                data.push({
                  x: randPoint(margin.left, width-margin.right),
                  y: randPoint(margin.bottom, height-margin.top),
                  r: randPoint(2, 45)
                });
              }
              return data;
            };

            d3.select('.proverb').remove();

            var proverb = g.append('g').attr('class','proverb')
              .append("text")
              .attr("x", width/2)
              .attr("y", height/2)
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text("Aimsirgggggsajkhgjkfskjfsdzjgfadksjh")
              .call(wrap,500);

            var bbox = proverb.node().getBBox();


            d3.select('.boxy').remove();
            var rect = g.append('g').attr('class','boxy')
              .append("rect")
              .attr("x", bbox.x)
              .attr("y", bbox.y)
              .attr("width", bbox.width)
              .attr("height", bbox.height)
              .style("fill", "#ccc")
              .style("fill-opacity", "0");

            var dataPoints = points(300);

            var pointErase = function(pad, data) {
              for(var i = dataPoints.length -1; i >= 0 ; i--){
                if(dataPoints[i].x > bbox.x-pad && dataPoints[i].x < (bbox.x+bbox.width+pad)){

                  if(dataPoints[i].y > (bbox.y-pad) && dataPoints[i].y < (bbox.height+bbox.y+pad)){
                    dataPoints.splice(i, 1);
                  }
                }
              }
              return dataPoints;
            };

            var rightTriangle = function(point) {
              return '0,0,  20,20, 0,20';
            };

            var rotate = function(amount) {
              return 'rotate('+ amount.toFixed(2) +')';
            };

            var translatePoint = function(point) {
              return 'translate('+ point.x + ',' + point.y +')';
            };

            var stringJoiner = function(fns, joinStr) {
              joinStr || (joinStr=',')
              return function joiner(point) {
                return fns.map(function(fn){ return fn(point); }).join(joinStr);
              };
            };

            var genRightAngle = function(generator) {
              generator || (generator = Math.random)
              return function() {
                return Math.floor(generator() * 4) * 90;
              };
            };

            var rotater = function(generator) {
              return function() { return rotate(generator()); };
            };

            var scaler = function(generator) {
              return function() { return scale(generator()); };
            };

            var sequence = function(fns) {
              return function seq(arg) {
                fns.forEach(function(fn){
                  arg = fn(arg);
                });
                return arg;
              };
            };

            var get = function(prop) { return function(obj) {
              var gogo = Math.abs(height/2 - obj[prop]);
              return gogo;
            }; };

            var color = function(args) {
              var h=args.hue, s=args.sat, l=args.light;
              if (typeof h !== 'function') { h = function(){ return args.hue || '0'; };}
              if (typeof s !== 'function') { s = function(){ return args.sat || '50'; };}
              if (typeof l !=='function') { l = function(){ return args.light || '50'; };}
              return function(point) {
                return 'hsl('+ h(point) + ',' + s(point) + '%,' + l(point) + '%)';
              };
            };

            var multiply = function mulitply(x) {
              return function multiplier(num) {
                return num * x;
              };
            };

            var add = function add(x) {
              return function adder(num) {
                return num + x;
              };
            };

              var scale = function (amount) {
                return 'scale(' + amount.toFixed(2) + ')';
              };


              d3.selectAll('.basetriangles').remove();
              dataPoints = pointErase(80, dataPoints);

              g.append('g').attr('class', 'basetriangles')
                .selectAll('polygon')
                .data(dataPoints)
                .enter().append('polygon')
                .attr('points', rightTriangle)
                .attr('transform', stringJoiner([
                  translatePoint,
                  rotater(genRightAngle()),
                  scaler(sequence([Math.random, multiply(3), Math.ceil]))
                ]))
                .attr('opacity', 0)
                .transition()
                .duration(3000)
                .attr('opacity', 0.25)
                //.attr('fill', dath)
                .attr('fill', color({
                  hue: sequence([get('x'),
                    d3.scale.linear().domain([0, width]).rangeRound([150, 200])
                  ]),
                  sat: sequence([Math.random, d3.scale.linear().range([40, 60])]),
                  light: sequence([get('y'),
                    d3.scale.linear().domain([0, height]).rangeRound([60, 20])
                  ])
                }))
                .attr('stroke-width', '1px')
                .attr('stroke', color({
                  hue: sequence([get('x'),
                    d3.scale.linear().domain([0, height]).rangeRound([160, 90])
                  ]),
                  light: 90
                }));


              d3.selectAll('.midtriangles').remove();

              dataPoints = pointErase(150, dataPoints);
              g.append('g').attr('class', 'midtriangles')
                .selectAll('polygon')
                .data(dataPoints)
                .enter().append('polygon')
                .attr('points', rightTriangle)
                .attr('transform', stringJoiner([
                  translatePoint,
                  rotater(genRightAngle()),
                  scaler(sequence([Math.random, multiply(3), Math.ceil]))
                ]))
                .attr('opacity', 0)
                .transition()
                .duration(3500)
                .attr('opacity', 0.5)
                //.attr('fill', dath)
                .attr('fill', color({
                  hue: sequence([get('y'),
                    d3.scale.linear().domain([0, width]).rangeRound([160, 70])
                  ]),
                  sat: sequence([Math.random, d3.scale.linear().range([0, 100])]),
                  light: sequence([get('y'),
                    d3.scale.linear().domain([0, height]).rangeRound([100, 50])
                  ])
                }))
                .attr('stroke-width', '1px')
                .attr('stroke', color({
                  hue: sequence([get('y'),
                    d3.scale.linear().domain([0, height]).rangeRound([100, 50])
                  ]),
                  light: 90
                }));


              d3.selectAll('.toptriangles').remove();
              dataPoints = pointErase(200, dataPoints);

              g.append('g').attr('class', 'toptriangles')
                .selectAll('polygon')
                .data(dataPoints)
                .enter().append('polygon')
                .attr('points', rightTriangle)
                .attr('transform', stringJoiner([
                  translatePoint,
                  rotater(genRightAngle()),
                  scaler(sequence([Math.random, multiply(3), Math.ceil]))
                ]))
                .attr('opacity', 0)
                .transition()
                .duration(3600)
                .attr('opacity', 0.6)
                //.attr('fill', dath)
                .attr('fill', color({
                  hue: sequence([get('y'),
                    d3.scale.linear().domain([0, width]).rangeRound([70, 30])
                  ]),
                  sat: sequence([Math.random, d3.scale.linear().range([70, 100])]),
                  light: sequence([get('y'),
                    d3.scale.linear().domain([0, height]).rangeRound([70, 95])])

                }));


              function wrap(text, width) {
                text.each(function () {
                  var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")) || 0,
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                  while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                      line.pop();
                      tspan.text(line.join(" "));
                      line = [word];
                      tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                  }
                });
              }

          };

          });
        }
      };
  }

})();