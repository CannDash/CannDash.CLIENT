(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller('DriverController', DriverController);

    DriverController.$inject = ['$stateparams', '$state'];

    /* @ngInject */
    function DriverController($stateparams, $state) {
        var vm = this;
        vm.title = 'DriverController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();