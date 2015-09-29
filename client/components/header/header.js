angular.module('ospApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/home'
    }];

    $scope.isCollapsed = true;
    $scope.logOut = Auth.logout;
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  })
  .directive('ospHeader', function(){
    return {
      templateUrl: "components/header/header.template.html",
      controller: "NavbarCtrl"
    }
  });
