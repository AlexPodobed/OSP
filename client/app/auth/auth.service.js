'use strict';

angular.module('ospApp')
  .factory('Auth', ['$http', '$localStorage', '$window', '$rootScope', '$state',
    function ($http, $localStorage, $window, $rootScope, $state) {
      var auth = {};

      auth.saveToken = function (token) {
        $localStorage.token = token;
      };
      auth.saveUser = function (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        $localStorage.user = payload.username;
      };
      auth.getToken = function () {
        return $localStorage.token || '';
      };
      auth.getUser = function () {
        return $localStorage.user || '';
      };
      auth.isLoggedIn = function () {
        var token = auth.getToken();

        if (token) {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload.exp > (Date.now() / 1000);
        } else {
          return false;
        }
      };
      auth.currentUser = function () {
        if (auth.isLoggedIn()) {
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.username;
        }
      };
      auth.register = function (user) {
        return $http.post('/auth/register', user).success(function (data) {
          auth.saveToken(data.token);
          auth.saveUser(data.token);
          $rootScope.$broadcast('auth-event')
        });
      };
      auth.login = function (user) {
        return $http.post('/auth/login', user).success(function (data) {
          auth.saveToken(data.token);
          auth.saveUser(data.token);
          $rootScope.$broadcast('auth-event');
        });
      };
      auth.logout = function () {
        delete $localStorage.token;
        delete $localStorage.user;
        $rootScope.$broadcast('auth-event');
        $state.go('login')
      };

      return auth;
    }]);
