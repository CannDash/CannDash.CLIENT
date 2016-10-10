(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$q', 'dashboardFactory', 'toastr'];

    /* @ngInject */
    function DashboardController($http, $q, dashboardFactory, toastr) {
        var vm = this;
        
        vm.dashData = [];

        activate();

        ////////////////

        function activate() {
			dashboardFactory.getDashboardData().then(
			function(response) {
                vm.dashData = response;
			});
        }
    }
})();