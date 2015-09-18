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
        Task.markAsComplete(id).
          then(function (task) {
            console.log(task);
            //$scope.tasks[id] = task
          });

        Tasks.complete.markAsComplete({id: id}, {}, function (data) {
          console.log('marked', data);
        });
      };

      $scope.editTask = Modal.confirm.edit(function (task) {
        $scope.$broadcast("task-edited", task)
      });

      $scope.$on('task-added', function (e, task) {
        $scope.tasks.push(task);
      });
    }

    return {
      restrict: "EA",
      templateUrl: "app/task/taskList.template.html",
      scope: {},
      controller: taskListCtrl
    }
  });
