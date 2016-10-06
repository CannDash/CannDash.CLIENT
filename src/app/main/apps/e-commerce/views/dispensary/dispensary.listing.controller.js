(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller('DispensaryListingController', DispensaryListingController);

    DispensaryListingController.$inject = ['$http', '$q', 'wpUrl', 'dispensaryListingFactory'];

    /* @ngInject */
    function DispensaryListingController($http, $q, wpUrl, dispensaryListingFactory) {
        var vm = this;
        vm.listings = [];

        activate();

        ////////////////

        function activate() {
        	dispensaryListingFactory.getAllListings().then(
                function(response) {
                    angular.extend(vm.listings.name, response);
                });

        }
    }
})();