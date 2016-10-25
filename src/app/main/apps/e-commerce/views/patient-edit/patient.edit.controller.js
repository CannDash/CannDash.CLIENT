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

        // Initialize
        activate();

        ////////////////

        function activate() {
	        // Initialize data immediately
	        var dispensaryId = 266;

            const patientId = $stateParams.patientId;     //jshint ignore:line

            vm.customer = {
                dispensaryId: dispensaryId
            };

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

		/**
         * Go to patient detail
         */
        function gotoPatientDetail() {
            $state.go('app.e-commerce.patient', { patientId: vm.customer.customerId });
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
            vm.addresses.push({customerId: vm.customer.customerId});
        }
    }
})();