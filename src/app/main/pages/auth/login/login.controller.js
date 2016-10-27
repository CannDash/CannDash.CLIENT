(function() {
  'use strict';

  angular
    .module('app.pages.auth.login')
    .controller('LoginController', LoginController);

  /** @ngInject */
  LoginController.$inject = ['authService', '$state'];

   function LoginController(authService, $state) {

     var vm = this;

    vm.authService = authService;

     vm.login = function () {
       // Show loading indicator
       vm.message = 'loading...';
       vm.loading = true;
       authService.login(vm.user, vm.pass, function (err) {
              if (err) {
                vm.message = "something went wrong: " + err.message;
                alert('Something went wrong: ' + err.message);
                vm.loading = false;
               }
            });
       };

     vm.googleLogin = function () {
       vm.message = 'loading...';
       vm.loading = true;

       authService.googleLogin(function (err) {
         if (err) {
           vm.message = "something went wrong: " + err.message;
           vm.loading = false;
         }
       });
     };
   }

 })();
