'use strict';

angular.module('ospApp')

  .controller('AuthCtrl', ['$scope', function ($scope) {
    $scope.user = {};
    console.log('AuthCtrl')
  }]);
