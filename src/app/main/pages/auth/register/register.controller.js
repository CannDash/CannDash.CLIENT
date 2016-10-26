(function() {
  'use strict';

  angular
    .module('app.pages.auth.register')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http', '$q', 'wpUrl', 'dispensaryListingFactory'];

    /** @ngInject */
    function RegisterController($http, $q, wpUrl, dispensaryListingFactory) {
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
    }
})();
