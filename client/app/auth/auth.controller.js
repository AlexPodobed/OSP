'use strict';

angular.module('ospApp')

  .controller('AuthCtrl', ['$scope', '$state', 'Auth', 'toaster', function ($scope, $state, Auth, toaster) {
    $scope.user = {};
    $scope.error = "";


    toaster.pop('success', 'its working');
    $scope.login = function () {
      console.log($scope.user)
      var user = {
        username: $scope.user.name,
        password: $scope.user.password
      };
      Auth.login(user).then(function () {
        console.log('success');
        $state.go('main');
      }, function(err){
        console.log(err)
        $scope.error = err.data.message;
      });
    };

    $scope.register = function () {
      var user = {
        username: $scope.user.name,
        password: $scope.user.password
      };
      Auth.register(user).then(function () {
        $state.go('main');
      }, function () {
        console.log('error');
      })
    };

  }]);
