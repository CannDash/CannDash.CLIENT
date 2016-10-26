(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('DriversController', DriversController);

    DriversController.$inject = ['$state', 'driverFactory'];

    /* @ngInject */
    function DriversController($state, driverFactory) {
        var vm = this;
        var dispensaryId = 266;

        // Data
        vm.driverData = {};

        // Initialize
        activate();

        ////////////////

        function activate() {
            driverFactory.getByDispensaryDrivers(dispensaryId).then(
                function(data) {
                    vm.driverData = data;
                }
            );       	
        }
    }
})();		