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

        // Initialize
        activate();

        ////////////////

        function activate() {
	        // Initialize data immediately
	        var dispensaryId = 266;

            const patientId = $stateParams.patientId;
            customerFactory.getByCustomer(patientId).then(
                function(customer) {
                    vm.customer = customer;

                    customerFactory.getCustomerAddresses(patientId).then(
                        function (addresses) {
                            vm.addresses = addresses;
                        });
                }
            );
        }

        ///////////////

        // Functions for buttons
	    vm.onSubmit = function () {
            
		};

		/**
         * Go to patient detail
         */
        function gotoPatientDetail() {
            $state.go('app.e-commerce.patient', { patientId: vm.customer.customerId });
        }

        /**
         * Go to patients grid
         */
        vm.goToPatients = function() {
            $state.go('app.e-commerce.patients');
        }
    }
})();


