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
  .directive("taskList", function (Task, Modal, Tasks) {
    function taskListCtrl($scope) {
      $scope.tasks = Tasks.task.query();

      $scope.filterBy = {
        active: true,
        completed: true
      };

      $scope.predicate = "summary";

      $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

      $scope.markAsDone = function (id) {
        console.log(id);
        Tasks.complete.markAsComplete({id: id}, {}, function (updatedTask) {
          console.log('marked', updatedTask);

          angular.forEach($scope.tasks, function (task, i) {
            if(task._id === updatedTask._id){
              $scope.tasks[i] = updatedTask;
              return ;
            }
          });

        });
      };

      $scope.editTask = Modal.confirm.edit(function (task) {
        $scope.$broadcast("task-edited", task)
      });

      $scope.$on('task-added', function (e, task) {
        console.info('listen to task-added event')
        $scope.tasks.push(task);
      });

      $scope.$on('task-updated', function (e, updatedTask) {
        console.info('listen to task-updated event')
        angular.forEach($scope.tasks, function (task, i) {
          if(task._id === updatedTask._id){
            $scope.tasks[i] = updatedTask;
            return ;
          }
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
