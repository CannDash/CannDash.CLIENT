(function() {
    'use strict';

    angular
        .module('cannDash')
        .controller('EditOrderController', EditOrderController);

    EditOrderController.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function EditOrderController($http, $q, toastr, apiUrl) {
        var vm = this;
        vm.title = 'EditOrderController';

        activate();

        ////////////////

        function activate() {

        }

       	function createOrder(){
       		if (vm.order.id == undefined || null) {
		        orderFactory.addOrder(vm.order).then(
		            function(id) {
		                vm.newOrder = id;
		            }
		        );
		    }
	    }
    }
})();