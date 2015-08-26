angular.module('ospApp')
  .directive("taskCreator", function (Task, Modal) {

    function taskCreatorCtrl($scope) {
      console.log('init', $scope.action, $scope.task);
      $scope.taskOld = angular.copy($scope.task, {});

      function getTomorrowDate(){
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      }
      function initializeNewTask(){
        return {
          summary: "",
          description: "",
          priority: "1",
          endDate:  getTomorrowDate(),
          completed: false
        }
      }

      $scope.newTask = ($scope.action === 'edit') ? $scope.taskOld : initializeNewTask();

      $scope.addNewTask = function(){
        $scope.newTask.endDate = new Date($scope.newTask.endDate).getTime();
        if ($scope.action === 'edit'){
          Task.update($scope.newTask.id, $scope.newTask);
          Modal.close();
        } else {
          Task.save($scope.newTask, function () {
            $scope.newTask = initializeNewTask();
          })
        }
      };

      $scope.$on("task-edited", function () {
        $scope.addNewTask();
      })
    }

    return {
      restrict: "EA",
      templateUrl: "app/task/taskCreator.template.html",
      scope: {
        action: "@taskAction",
        task: "=taskToEdit"
      },
      controller: taskCreatorCtrl
    }
  });
