(function() {
  'use strict';

  angular
    .module('app.pages.auth.reset-password')
    .controller('ResetPasswordController', ResetPasswordController);

  /** @ngInject */
  ResetPasswordController.$inject = ['authService', '$state', '$ngBootbox'];

  function ResetPasswordController(authService, $state, $ngBootbox) {

    var vm = this;

    vm.authService = authService;

    vm.reset = function() {
      //Show loading indicator
      vm.message = 'loading...'
      vm.loading = true;
      authService.reset(vm.email, vm.password, function(err) {
        if (err) {
          vm.message = "something went wrong: " + err.message;
          alert('Something went wrong: ' + err.message);
          vm.loading = false;
        }
      })
    };
  }

})();
