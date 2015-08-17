angular.module('ospApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/home'
    }];

    $scope.isCollapsed = true;

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
