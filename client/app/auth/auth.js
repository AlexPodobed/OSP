'use strict';

angular.module('ospApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.template.html',
        controller: 'AuthCtrl',
        data: {
          isPublic: true
        },
        onEnter: ['Auth', '$state', function(Auth, $state){
          if(Auth.isLoggedIn()){
            $state.go('main');
          }
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/auth/register.template.html',
        controller: 'AuthCtrl',
        data: {
          isPublic: true
        },
        onEnter: ['Auth', '$state', function(Auth, $state){
          if(Auth.isLoggedIn()){
            $state.go('main');
          }
        }]
      });
  });
