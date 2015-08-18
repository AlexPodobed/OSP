angular.module('ospApp')
  .directive('datepickerPopup', function (){
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function(scope, element, attr, controller) {
        //remove the default formatter from the input directive to prevent conflict
        controller.$formatters.shift();
      }
    }
  })
  .directive("ospDatepicker", function(datepickerPopupConfig, $timeout, $filter){


    return {
      restrict: "EA",
      templateUrl: "components/datepicker/datepickerDirective.template.html",
      scope: {
        endDate: "="
      },
      controller: function ($scope) {
        var startDate = $filter('date')((new Date(new Date().getTime() + 24*60*60*1000)),"dd-MMMM-yyyy" );
        datepickerPopupConfig.datepickerPopup = 'dd-MMMM-yyyy';

        $scope.startDate = startDate;
        $scope.status = {
          opened: false
        };

        $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };
        $scope.formats = "dd-MMMM-yyyy";
        $scope.open = function($event) {
          $timeout(function(){$scope.status.opened = true;})
        };
      }
    }
  });
