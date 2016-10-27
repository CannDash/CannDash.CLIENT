(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('PatientController', PatientController);

    PatientController.$inject = [
        '$state', 
        '$stateParams', 
        'customerFactory'
        ];

    /* @ngInject */
    function PatientController(
        $state, 
        $stateParams, 
        customerFactory)
    {

        var vm = this;

        // Methods
        vm.goToPatients = goToPatients;

        activate();

        ////////////////

        function activate() {
            const patientId = $stateParams.id;
            customerFactory.getByCustomer(patientId).then(
                function(customer) {
                    vm.customer = customer;

                    customerFactory.getCustomerAddresses(patientId).then(
                        function (addresses) {
                            vm.customer.addresses = addresses;
                        });
                }
            );
        }

        /**
         * Go to patients grid
         */
        function goToPatients() {
            $state.go('app.e-commerce.patients');
        }
    }
})();