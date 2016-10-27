(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('EditPatientController', EditPatientController);

    EditPatientController.$inject = [
    	'$http', 
    	'$q', 
    	'toastr', 
    	'apiUrl', 
    	'orderFactory', 
    	'dispensaryFactory', 
    	'dispensaryProductFactory',
		'customerFactory',
    	'$state', 
    	'$stateParams', 
    	'$ngBootbox'];

    /* @ngInject */
    function EditPatientController(
    	$http, 
    	$q, 
    	toastr, 
    	apiUrl, 
    	orderFactory, 
    	dispensaryFactory, 
    	dispensaryProductFactory,
		customerFactory,
    	$state, 
    	$stateParams, 
    	$ngBootbox)
    {

        var vm = this;
        var wProductsUrl = null;
        var previousPatient = null;

        // Methods
        vm.gotoPatientDetail = gotoPatientDetail;
        vm.goToPatients = goToPatients;
        vm.onSubmit = onSubmit;
        vm.addAddress = addAddress;
        vm.deleteAddress = deleteAddress;

        // Initialize
        activate();

        ////////////////

        function activate() {
	        // Initialize data immediately
            var dispensaryId = 266;

            const patientId = $stateParams.id;     //jshint ignore:line

            vm.customer = {
                dispensaryId: dispensaryId,
                addresses: []
            };

            if (patientId)
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

        ///////////////

		/**
         * Go to patient detail
         */
        function gotoPatientDetail() {
            $state.go('app.e-commerce.patient', { id: vm.customer.customerId });
        }

        /**
         * Go to patients grid
         */
        function goToPatients() {
            $state.go('app.e-commerce.patients');
        }

        /**
         * Submit new patient button
         */
        function onSubmit() {
            var patient = vm.customer;
            vm.customer.customerAddresses = vm.customer.addresses;
            delete vm.customer.addresses;

                if (patient.customerId) {
                    customerFactory.updateCustomer(patient)     //jshint ignore:line
                        .then(
                            function () {
                                $state.go('app.e-commerce.patients');                     
                            }
                        );
                } else {
                    customerFactory.addCustomer(patient).then(      //jshint ignore:line
                        function () {
                            $state.go('app.e-commerce.patients');                     
                        }
                    );
                }
        }

        /**
         * Add address button
         */
        function addAddress() {
            vm.customer.addresses.push({customerId: vm.customer.customerId});
        }

        /**
         * Delete address button
         */
        function deleteAddress(address) {
            _.pull(vm.customer.addresses, address);    //jshint ignore:line
        }

        vm.onPrimaryAddressSelected = function (address) {
            vm.customer.addresses.forEach(
                function(a) {
                    // if this address is selected as primary all others are false
                    if (a != address) a.primaryAddress = false;  //jshint ignore:line
                }// body...
        );
        
    };
}
})();