(function() {
  'use strict';

  angular
    .module('app.pages.auth.register')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  RegisterController.$inject = ['authService', '$state'];

  function RegisterController(authService, $state) {

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
