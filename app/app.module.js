(function() {
  'use strict';

  angular.module('app', [
    /*
     * everyone will have access to these.
     */
    'app.core',
    'app.d3Service',
    'ngRoute',

    /*
     *features
     */
    'app.bars',
    'app.scatter',
    'app.pattern'
  ]);

  
})();