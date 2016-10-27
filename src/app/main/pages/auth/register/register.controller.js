(function() {
  'use strict';

  angular
    .module('app.pages.auth.register')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http', '$q', 'wpUrl', 'dispensaryListingFactory', 'authService'];

    /** @ngInject */
    function RegisterController($http, $q, wpUrl, dispensaryListingFactory, authService) {
        var vm = this;

        // Data
        vm.dispensaries = [];

       // Initialize
        activate();

        ////////////////




        function activate() {
            dispensaryListingFactory.getAllListings().then(
                function (data) {
                    vm.dispensaries = data;
                }
            );
        }

        vm.signup = function () {
          // Show loading indicator
          vm.message = 'loading...';
          vm.loading = true;
          var auth0Data = {
               client_id: AUTH0_CLIENT_ID,
               connection: AUTHO_CONNECTION,
               email: vm.dispensary.username,
               password: vm.dispensary.password,
               // user_metadata:
               //  {
               //       dispensaryId: vm.dispensary.wmid,
               //       secondaryId: vm.dispensary.id,
               //       companyName: vm.dispensary.name,
               //       Street: vm.dispensary.address,
               //       state: vm.dispensary.state,
               //       zipCode: vm.dispensary.zip_code,
               //       phone: vm.dispensary.phone_number
               //  }

          };
          authService.signup(auth0Data, function (err) {
            if (err) {
              vm.message = "something went wrong: " + err.message;
              vm.loading = false;
            }
          });
        };
    }
})();
