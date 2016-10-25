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

        // Initialize
        activate();

        ////////////////

        function activate() {
	        // Initialize data immediately
	        var dispensaryId = 266;

            const patientId = $stateParams.patientId;     //jshint ignore:line

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

            patient.forEach(
                function (newPatient) {
                    // Patient Info
                    patient.customer.firstName = patient.customer.firstName;
                    patient.customer.lastName = patient.customer.lastName; 
                    patient.customer.gender = patient.customer.gender;
                    patient.customer.age = patient.customer.age; 
                    patient.customer.dateOfBirth = patient.customer.dateOfBirth;
                    patient.customer.driversLicense = patient.customer.driversLicense;
                    patient.customer.phone = patient.customer.phone;
                    patient.customer.email = patient.customer.email;

                    // Address Info
                    patient.addresses.street = patient.addresses.street;
                    patient.addresses.unitNo = patient.addresses.unitNo;
                    patient.addresses.city = patient.addresses.city;
                    patient.addresses.state = patient.addresses.state;
                    patient.addresses.zipCode = patient.addresses.zipCode;
                    patient.addresses.deliveryNotes = patient.addresses.deliveryNotes;

                    // Medical Info   
                    patient.customer.doctorLetter = patient.customer.doctorLetter; 
                    patient.customer.medicalReason = patient.customer.medicalReason;
                    patient.customer.mmicId = patient.customer.mmicId;
                    patient.customer.mmicExpiration = patient.customer.mmicExpiration;        
                });

                if (patient.customerId)  //jshint ignore:line
                    customerFactory.updatePatient(patient)     //jshint ignore:line
                        .then(
                            function () {
                                $state.go('app.e-commerce.patients');                     
                            }
                        );
                else {
                    customerFactory.addPatient(patient).then(      //jshint ignore:line
                        function () {
                            $state.go('app.e-commerce.patients');                     
                        }
                    );
                }
        }
    }
})();