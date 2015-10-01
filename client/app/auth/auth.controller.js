'use strict';

angular.module('ospApp')

  .controller('AuthCtrl', ['$scope', '$state', 'Auth', 'toaster', function ($scope, $state, Auth, toaster) {
    $scope.user = {};
    $scope.error = "";



    $scope.login = function () {
      console.log($scope.user)
      var user = {
        username: $scope.user.name,
        password: $scope.user.password
      };
      Auth.login(user).then(function () {
        console.log('success');
        $state.go('main');
        toaster.success('Successfully logged in', 'Welcome ' + $scope.user.name);
      }, function(err){
        console.log(err)
        $scope.error = err.data.message;
        toaster.error('Incorrect credentials', 'Error: ' + err.data.message);
      });
    };

    $scope.register = function () {
      var user = {
        username: $scope.user.name,
        password: $scope.user.password
      };
      Auth.register(user).then(function () {
        $state.go('main');
        toaster.success('Successfully registered', 'Welcome ' + $scope.user.name);
      }, function (err) {
        $scope.error = err.data.message;
        toaster.error('Oops!', 'Error: ' + err.data.message);
      })
    };

  }]);
