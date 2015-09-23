angular.module('ospApp')
  .factory('Tasks', ["$rootScope", "$resource", function ($rootScope, $resource) {
    return {
      task: $resource("/api/tasks/:id", {id: "@id"}, {
        update: {method: "PUT"}
      }),
      complete: $resource('/api/tasks/complete/:id', {id: "@id"}, {
        markAsComplete: { method: "POST"}
      })
    }
  }]);
