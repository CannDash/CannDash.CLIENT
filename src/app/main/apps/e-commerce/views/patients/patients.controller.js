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

        // Data
        vm.customerData = {};

        // Methods
        vm.createNewPatient = createNewPatient;

        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-patients-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };

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

        vm.gotoPatientDetail = function(patientId)
        {
            $state.go('app.e-commerce.patient', {patientId: patientId});
        };
    }
})();

