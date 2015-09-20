angular.module('ospApp')
  .directive("taskCreator", function (Task, Modal, Tasks, $rootScope) {

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

      function perfomOldTaskObj(obj){
        var timestamp = parseInt(obj.endDate);
        obj.endDate = new Date(timestamp);
        return obj;
      }

      $scope.newTask = ($scope.action === 'edit') ? perfomOldTaskObj($scope.taskOld) : initializeNewTask();

      $scope.addNewTask = function(){
        // convert to timestamp
        $scope.newTask.endDate = new Date($scope.newTask.endDate).getTime();

        if ($scope.action === 'edit'){
          Tasks.task.update({id: $scope.newTask._id}, $scope.newTask, function (task) {
            console.log('updated: ',task);
            Modal.close();
            $rootScope.$broadcast('task-updated', task);
          });
        } else {
          Tasks.task.save($scope.newTask, function (task) {
            $rootScope.$broadcast("task-added", task);
            $scope.newTask = initializeNewTask();
            console.log('recived: ',task);
          });
        }
      };

      var listenEvent = $scope.$on("task-edited", function () {
        $scope.addNewTask();
      });

      var modalClosingListener = $scope.$on('modal-closed', function(){
        console.log('clean Up')
        listenEvent();
        modalClosingListener();
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
