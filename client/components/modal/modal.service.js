'use strict';

angular.module('ospApp')
  .directive("bindHtml", function () {
    return {
      restrict: "A",
      scope: {
        bindHtml: "="
      },
      link: function (scope, element, attr) {
        element.append(scope.bindHtml)
      }
    }
  })
  .factory('Modal', function ($rootScope, $modal, $compile, $modalStack) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {
        edit: function (cb) {
          cb = cb || angular.noop;

          return function () {
            var args = Array.prototype.slice.call(arguments),
                task = args[0],
                editModal;

            editModal = openModal({
              modal: {
                task: task,
                dismissable: true,
                title: 'Task Details',
                html: $compile('<task-creator task-action="edit" task-to-edit="task"></task-creator>')(this),
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Update',
                  click: function(e) {
                    editModal.close(e);
                  }
                }, {
                  classes: 'btn-warning',
                  text: 'Cancel',
                  click: function(e) {
                    editModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-info');

            editModal.result.then(function(event) {
              cb.apply(event, args);
            });

            editModal.result.finally(function() {
              $rootScope.$broadcast('modal-closed');
            });
          }
        },
        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          console.log(del)
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      },
      close: function (reason) {
        $modalStack.dismissAll(reason);
      }
    };
  });
