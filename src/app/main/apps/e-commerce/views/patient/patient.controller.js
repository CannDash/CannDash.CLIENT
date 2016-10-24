(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('PatientController', PatientController);

    PatientController.$inject = ['$state', '$stateParams', 'dispensaryFactory', 'customerFactory'];

    /* @ngInject */
    function PatientController($state, $stateParams, dispensaryFactory, customerFactory) {
        var vm = this;
        var dispensaryId = 266;       
        
        // Data
        vm.patient = [];


        // Methods
        vm.goToPatients = goToPatients;

        activate();

        ////////////////

        function activate() {
        	
        }

        function goToPatients() {
            $state.go('app.e-commerce.patients');
        }
    }
})();