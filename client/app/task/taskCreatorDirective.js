angular.module('ospApp')
  .directive("taskCreator", function(){
      function taskCreatorCtrl($scope){

      }

      return {
        restrict: "EA",
        templateUrl: "app/task/taskCreator.template.html",
        controller: taskCreatorCtrl
      }
  });
