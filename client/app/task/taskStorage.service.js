angular.module('ospApp')
  .factory("taskStorage", ["$localStorage",function($localStorage){
    var Storage = {};


    Storage.tasks = $localStorage.tasks || [];

    Storage.getAll = function(){
      return this.tasks;
    };

    Storage.add = function (obj) {
      this.tasks.push(obj);
      $localStorage.tasks = this.tasks
    };


    return Storage;
  }]);
