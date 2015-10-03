angular.module('ospApp')
  .filter('taskFilter', function () {
    return function (tasks, filterBy) {
      var filtered = [];
      if (filterBy.active && filterBy.completed) {
        filtered = tasks;
      } else {
        angular.forEach(tasks, function (task) {
          if (filterBy.active && !task.completed) {
            filtered.push(task)
          } else if (filterBy.completed && task.completed) {
            filtered.push(task)
          }
        });
      }
      return filtered;
    }
  })
  .directive("taskList", function (Modal, Tasks,toaster) {
    function taskListCtrl($scope) {
      $scope.tasks = Tasks.task.query();

      $scope.filterBy = {
        active: true,
        completed: true
      };

      $scope.predicate = "summary";

      function findAndReplace (updatedTask, task, i) {
        if(task._id === updatedTask._id){
          $scope.tasks[i] = updatedTask;
          return ;
        }
      }

      $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

      $scope.markAsDone = function (id) {
        Tasks.complete.markAsComplete({id: id}, {}, function (updatedTask) {
          angular.forEach($scope.tasks, function (task, i) {
            findAndReplace(updatedTask, task, i);
          });
          toaster.success('Task: '+ updatedTask.summary, "Successfully marked as " + (updatedTask.completed ? 'done' : 'undone'))
        });
      };

      $scope.editTask = Modal.confirm.edit(function (task) {
        $scope.$broadcast("task-edited", task)
      });

      $scope.$on('task-added', function (e, task) {
        $scope.tasks.push(task);
      });

      $scope.$on('task-updated', function (e, updatedTask) {
        angular.forEach($scope.tasks, function (task, i) {
          findAndReplace(updatedTask, task, i);
        });
      });
    }

    return {
      restrict: "EA",
      templateUrl: "app/task/taskList.template.html",
      scope: {},
      controller: taskListCtrl
    }
  });
