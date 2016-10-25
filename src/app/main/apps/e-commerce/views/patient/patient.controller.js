(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('PatientController', PatientController);

    PatientController.$inject = [
        '$state', 
        '$stateParams', 
        'dispensaryFactory', 
        'customerFactory'
        ];

    /* @ngInject */
    function PatientController(
        $state, 
        $stateParams, 
        dispensaryFactory, 
        customerFactory) 
    {

        var vm = this;
        var dispensaryId = 266;       
        
        // Data
        vm.patientDetail = [];

        // Methods
        vm.goToPatients = goToPatients;

        activate();

        ////////////////

        function activate() {       	
            dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customers =
                        _.map(  //jshint ignore:line
                            data,
                            function (c) {
                                const customer = c.customer;    //jshint ignore:line
                                customer.address = c.address;
                                return customer;
                            });

                    if (vm.patientDetail.customerId) {
                        previousPatient = vm.order.customer =   //jshint ignore:line
                            _.find( //jshint ignore:line
                                vm.customers,
                                function (c) {
                                    return c.customerId == vm.patientDetail.customerId; //jshint ignore:line
                                });
                        fetchCustomerAddresses();
                    }
                }
            );
        }

        function fetchCustomerAddresses() {
            vm.customerAddresses = null;
            customerFactory.getCustomerAddresses(vm.patientDetail.customerId).then(
                function (addresses) {
                    vm.customerAddresses = addresses;
                });
        }

        /**
         * Go to patients grid
         */
        function goToPatients() {
            $state.go('app.e-commerce.patients');
        }
    }
})();