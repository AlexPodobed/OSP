angular.module('ospApp')
  .directive("taskCreator", function (Task, Modal, Tasks, $rootScope) {

    function taskCreatorCtrl($scope) {
      console.log('init', $scope.action, $scope.task);
      $scope.taskOld = angular.copy($scope.task, {});
console.log($scope.taskOld)
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
        // convert to timestamp
        // TODO: change from utc format to UTC 
        $scope.newTask.endDate = new Date($scope.newTask.endDate).getTime();

        if ($scope.action === 'edit'){
          console.log($scope.newTask)
          Tasks.task.update({id: $scope.newTask._id}, $scope.newTask, function (task) {
            console.log('updated: ',task);
            Modal.close();
          });
        } else {
          Tasks.task.save($scope.newTask, function (task) {
            $rootScope.$broadcast("task-added", task);
            $scope.newTask = initializeNewTask();
            console.log('recived: ',task);
          });
        }
      };

      $scope.$on("task-edited", function (e, task) {
        console.log('task-edited event', task)
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
