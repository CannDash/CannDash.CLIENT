(function() {
  'use strict';

  angular
    .module('app.pages.auth.forgot-password')
    .controller('ForgotPasswordController', ForgotPasswordController);

  ForgotPasswordController.$inject = ['authService', '$state'];

  function ForgotPasswordController(authService, $state) {

    var vm = this;

    vm.authService = authService;

    vm.reset = function() {
      //Show loading indicator
      vm.message = 'loading...'
      vm.loading = true;
      authService.reset(vm.email, function(err) {
        if (err) {
          vm.message = "something went wrong: " + err.message;
          alert('Something went wrong: ' + err.message);
          vm.loading = false;
        }
      })
    };
  }

})();
