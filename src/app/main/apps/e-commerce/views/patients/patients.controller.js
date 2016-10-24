(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('PatientsController', PatientsController);

    /** @ngInject */
    function PatientsController($state, dispensaryFactory) {
        var vm = this;
        var dispensaryId = 266;

        // Methods
        vm.createNewPatient = createNewPatient;


        // Initialize
        activate();


        //////////

        function activate() {
            dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customerData = data;
                }
            );
        }

        /**
         * Create new patient
         */
        function createNewPatient() {
            $state.go('app.e-commerce.edit-patient');
        }   
    }
})();
