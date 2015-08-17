angular.module('ospApp')
  .directive('ospFooter', function(){
    return {
      templateUrl: "components/footer/footer.template.html",
      replace: true
    }
  });
