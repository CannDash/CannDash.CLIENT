(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$q', 'dashboardFactory', 'toastr', 'driverFactory'];

    /* @ngInject */
    function DashboardController($http, $q, dashboardFactory, toastr, driverFactory) {
        var vm = this;
        
        vm.dashData = [];
        vm.newDriver = {};


        activate();

        ////////////////

        function activate() {
			dashboardFactory.getDashboardData().then(
			function(response) {
                vm.dashData = response;
			});
        }

        driverFactory.addDriver().then(
            function(response) {
                vm.newDriver = response;
            });
    }
})();