(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller('DriverController', DriverController);

    DriverController.$inject = ['$http', '$q', '$stateparams', 'driverFactory', 'toastr'];

    /* @ngInject */
    function DriverController($http, $q, $stateparams, driverFactory, toastr) {
        var vm = this;
        
        vm.drivers = [];
        vm.patients = [];

        activate();

        ////////////////

        function activate() {
			driverFactory.getByDriverId().then(
			function(response) {
				vm.doctors = response;
			});
        }
    }
})();