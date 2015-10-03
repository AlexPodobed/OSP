angular.module('ospApp')
  .directive("taskCreator", function (Modal, Tasks, $rootScope, toaster) {

    function taskCreatorCtrl($scope) {
      $scope.taskOld = angular.copy($scope.task, {});

      function getTomorrowDate(){
        var tomorrow = new Date();
        var currentDay = tomorrow.getDay();
        var plusDays = (currentDay === 5) ? 3 : (currentDay === 6) ? 2 : 1;
        tomorrow.setDate(tomorrow.getDate() + plusDays);
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
            Modal.close();
            $rootScope.$broadcast('task-updated', task);
            toaster.success('Task: ' +task.summary, 'Successfully updated');
          });
        } else {
          Tasks.task.save($scope.newTask, function (task) {
            $rootScope.$broadcast("task-added", task);
            toaster.success('Task: ' + task.summary, 'Successfully added');
            $scope.newTask = initializeNewTask();
          });
        }
      };

      var listenEvent = $scope.$on("task-edited", function () {
        $scope.addNewTask();
      });

      var modalClosingListener = $scope.$on('modal-closed', function(){
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
