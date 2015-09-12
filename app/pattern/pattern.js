(function (){
  'use strict';

  angular
    .module('app')
    .controller('Pattern',Pattern);

  function Pattern(){
    /*jshint validthis: true */
    var vm = this;

    vm.pattern = pattern;

    function pattern(){
      return 'd3pattern';
    }
  }
})();