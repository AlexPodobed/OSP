'use strict';

angular.module('ospApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngStorage',
  'toaster',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/home');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
      return {
        'request': function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $localStorage.token;
          }
          return config;
        },
        'responseError': function (response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/signin');
          }
          return $q.reject(response);
        }
      };
    }]);
  })
  .run(['$rootScope', '$state', 'Auth', '$timeout', function ($rootScope, $state, Auth, $timeout) {
    function initAuthDetails(){
      $rootScope.user = Auth.getUser();
      $rootScope.isLoggedIn = Auth.isLoggedIn();

      console.log("Login details",$rootScope.user, $rootScope.isLoggedIn);
    }


    initAuthDetails();

    $rootScope.$on('auth-event', initAuthDetails);

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var isAuthenticated = Auth.isLoggedIn();
      var isPublicAction = angular.isObject(toState.data) && toState.data.isPublic;

      console.warn("isAuthenticated:",isAuthenticated);
      console.warn("isPublicAction:",isPublicAction);

      if(isPublicAction || isAuthenticated){
        return
      }
      event.preventDefault();

      if(isAuthenticated){
        $state.go(toState, toParams);
        return;
      }

      $state.go('login');

    });
  }]);
