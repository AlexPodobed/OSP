'use strict';

angular.module('ospApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        data: {
          isPublic: false
        }
      });
  });
