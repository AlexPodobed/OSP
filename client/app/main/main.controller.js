'use strict';

angular.module('ospApp')
  .filter('taskFilter', function () {
    return function(task){

    }
  })
  .controller('MainCtrl', ['$scope', 'taskStorage', function ($scope, taskStorage) {
    function getTomorrowDate(){
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    function initializeNewTask(){
      return {
        summary: "",
        priority: "1",
        endDate:  getTomorrowDate(),
        completed: false
      }
    }

    $scope.tasks = taskStorage.getAll();
    $scope.newTask = initializeNewTask();

    $scope.filterBy = {
      active: true,
      completed: false
    };

    $scope.addNewTask = function(){
      $scope.newTask.endDate = new Date($scope.newTask.endDate).getTime();
      $scope.tasks.push($scope.newTask);
      $scope.newTask = initializeNewTask();
    };


    console.log(taskStorage.getAll())
  }]);
