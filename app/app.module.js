(function() {
  'use strict';

  angular.module('app', [
    /*
     * everyone will have access to these.
     */
    'app.core',
    'app.d3Service',

    /*
     *features
     */
    'app.bars',
    'app.scatter'
  ]);

  
})();