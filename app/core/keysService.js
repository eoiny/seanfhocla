(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('keysService', keysService);

  keysService.$inject = ['$document', '$q', '$rootScope'];

  function keysService($document, $q, $rootScope){

    return {
      keys: function() { return d.promise; }
    };
  }
})();