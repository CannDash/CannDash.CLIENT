(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('EditOrderController', EditOrderController);

    EditOrderController.$inject = [
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
    function EditOrderController(
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
    	$ngBootbox
    	){

        var vm = this;
        var wProductsUrl = null;
        var previousPatient = null;

        // Initialize
        activate();

        ////////////////

        function activate() {
	        // Initialize data immediately
	        var dispensaryId = 266;
        }

        ///////////////

        // Functions for buttons
	    vm.onSubmit = function () {
            
		};

		/**
         * Go to patient detail
         */
        function gotoPatientDetail(id) {
            $state.go('app.e-commerce.patient', { id: id });
        }
	    
		    var dispensaryId = 266;
	        
	        orderFactory.getOrdersByDispensary(dispensaryId).then(
	            function(data) {
	                vm.patientDetail = data;
	            }
	        );


        ///////////////
    }
})();


