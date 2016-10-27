(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller(
            'DispensaryListingController', 
            DispensaryListingController
        );

    DispensaryListingController.$inject = [
        '$http', 
        '$q', 
        'wpUrl', 
        'dispensaryListingFactory'];

    /* @ngInject */
    function DispensaryListingController(
            $http, 
            $q, 
            wpUrl, 
            dispensaryListingFactory) 
    {

        var vm = this;
        vm.dispensaries = [];

        activate();

        ////////////////

        function activate() {
        	dispensaryListingFactory.getAllListings().then(
                function(response) {
                    angular.extend(vm.dispensaries.name, response);
                });

        }
    }
})();