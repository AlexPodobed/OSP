angular.module('ospApp')
  .factory('Tasks', ["$rootScope", "$resource", function ($rootScope, $resource) {
    return {
      task: $resource("/api/tasks/:id", {id: "@id"}, {
        update: {method: "PUT"}
      }),
      complete: $resource('/api/tasks/:id', {id: "@id"}, {
        markAsComplete: { method: "POST"}
      })
    }
  }])
  .factory("Task", ["taskStorage", "$rootScope", "GeneratorID", "$q", function (taskStorage, $rootScope, GeneratorID, $q) {
    return {
      query: function(){
        return taskStorage.getAll();
      },
      get: function(id){
        return taskStorage.getTask(id);
      },
      save: function (obj, cb) {
        var _id = GeneratorID.generate();

        taskStorage.addTask(_id, obj).then(function (tasks) {
          $rootScope.$broadcast("task-added", tasks);
          cb();
        });
      },
      update: function (id, obj) {
        taskStorage.updateTask(id, obj).then(function (tasks) {
          $rootScope.$broadcast("task-added", tasks);
        });
      },
      remove: function (id) {
        // remove task
        return "list of tasks"
      },
      markAsComplete: function (id) {
        var deferred = $q.defer();
        taskStorage.markAsCompletedTask(id).then(function (task) {
          deferred.resolve(task);
        });

        return deferred.promise;
      }
    }
  }])
  .factory("taskStorage", ["$localStorage", "$rootScope", "GeneratorID", "$q",function ($localStorage, $rootScope, GeneratorID, $q) {
    var Storage = {};

    function init(){
      if(!$localStorage.tasks){
        $localStorage.tasks = {};
      }
    }
    function formArray(obj){
      var tempArr = [];
      angular.forEach(obj, function (task, id) {
        task.id = id;
        tempArr.push(task)
      });
      return tempArr;
    }
    init();

    Storage.tasks = $localStorage.tasks;

    Storage.getAll = function () {
      return formArray(this.tasks)
    };
    Storage.getTask = function (id) {
      return Storage.tasks[id];
    };
    Storage.addTask = function (id, obj) {
      var deferred = $q.defer();

      if(!Storage.tasks[id]){
        Storage.tasks[id] = obj;
        deferred.resolve(formArray(Storage.tasks));
      }else {
        deferred.reject({error: "oops, already exist"});
      }

      return deferred.promise;
    };
    Storage.updateTask = function (id, obj) {
      var deferred = $q.defer();

      if(Storage.tasks[id]){
        delete obj.id;
        Storage.tasks[id] = obj;
        deferred.resolve(formArray(Storage.tasks));
      } else {
        deferred.reject({error: "oops, can not fine"});
      }


      return deferred.promise;
    };
    Storage.markAsCompletedTask = function (id) {
      var deferred = $q.defer();
      var selectedTask = Storage.tasks[id];
      if(!selectedTask){
        deferred.reject({error: "sorry, there is no task with this id" + id});
      } else {
        selectedTask.completed = !selectedTask.completed;
        selectedTask.id = id;
        deferred.resolve(selectedTask);
      }

      return deferred.promise;
    };

    return Storage;
  }]);
