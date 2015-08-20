angular.module('ospApp')
  .directive("taskCreator", function (Task) {
    function taskCreatorCtrl($scope) {
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
      $scope.newTask = initializeNewTask();

      $scope.addNewTask = function(){
        $scope.newTask.endDate = new Date($scope.newTask.endDate).getTime();

        Task.save($scope.newTask, function () {
          $scope.newTask = initializeNewTask();
        })
      };
    }

    return {
      restrict: "EA",
      templateUrl: "app/task/taskCreator.template.html",
      scope: {},
      controller: taskCreatorCtrl
    }
  });
