angular.module('ospApp')
  .filter('taskFilter', function () {
    return function (tasks, filterBy) {
      var filtered = {};
      if (filterBy.active && filterBy.completed) {
        filtered = tasks;
      } else {
        angular.forEach(tasks, function (task, id) {
          if (filterBy.active && !task.completed) {
            filtered[id] = task;
          } else if (filterBy.completed && task.completed) {
            filtered[id] = task;
          }
        });
      }
      return filtered;
    }
  })
  .directive("taskList", function (Task) {
    function taskListCtrl($scope) {
      $scope.tasks = Task.query();

      $scope.filterBy = {
        active: true,
        completed: false
      };

      $scope.markAsDone = function (id) {
        console.log("done", Task.get(id));

        Task.markAsComplete(id).
          then(function (task) {
            $scope.tasks[id] = task
          });
      };

      $scope.$on('task-added', function (e, tasks) {
        $scope.tasks = tasks;
      });

    }

    return {
      restrict: "EA",
      templateUrl: "app/task/taskList.template.html",
      scope: {},
      controller: taskListCtrl
    }
  });
