'use strict';

angular.module('ospApp')
  .controller('MainCtrl', function ($scope, $timeout, $filter, datepickerPopupConfig) {
    // datepicker settings

    var endDate = new Date(new Date().getTime() + 24*60*60*1000);
    $scope.endDate = endDate;
    $scope.status = {
      opened: false
    };
    $scope.global = {
      dt:  $filter('date')(endDate, "dd-MMMM-yyyy")
    };
    //$scope.dt = new Date();

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };


    $scope.open = function($event) {
      $timeout(function(){$scope.status.opened = true;})
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.formats = "dd-MMMM-yyyy";

    $scope.logCurrentDTG = function () {
      console.log($scope.newTask.endDate.getTime())
    };
    datepickerPopupConfig.datepickerPopup = 'dd-MMMM-yyyy';
  //  end datepicker staff


    function initializeNewTask(){
      return {
        summary: "",
        priority: "1",
        endDate:  endDate.getTime(),
        completed: false
      }
    }

    $scope.newTask = initializeNewTask();

    $scope.tasks = [];

    $scope.addNewTask = function(){
      console.log('submited');

      $scope.newTask.endDate = new Date($scope.newTask.endDate).getTime();

      $scope.tasks.push($scope.newTask);
      $scope.newTask = initializeNewTask();
    }
  });
