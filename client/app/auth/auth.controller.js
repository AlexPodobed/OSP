'use strict';

angular.module('ospApp')

  .controller('AuthCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    $scope.user = {};
    console.log('AuthCtrl');

    console.log(Auth.getToken())

    $scope.login = function () {
      console.log($scope.user)
      var user = {
        username: $scope.user.name,
        password: $scope.user.password
      };
      Auth.login(user).then(function () {
        console.log('success');
        $state.go('main');
      }, function(){
        console.log('error');
      });
    }
  }]);
