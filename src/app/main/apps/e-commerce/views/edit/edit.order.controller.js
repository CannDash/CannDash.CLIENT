(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('EditOrderController', EditOrderController);

    EditOrderController.$inject = ['$http', '$q', 'toastr', 'apiUrl', 'orderFactory', 'dispensaryFactory', 'dispensaryProductFactory'];

    /* @ngInject */
    function EditOrderController($http, $q, toastr, apiUrl, orderFactory, dispensaryFactory, dispensaryProductFactory) {
        var vm = this;
        var wProductsUrl = null;

        // Data
        vm.price = [];
        vm.order = {};
        vm.order.products = [];
        vm.categories = [];


        // Methods
        vm.addProduct = addProduct;
        // vm.onCategorySelected = onCategorySelected;
        // vm.getProductMatches = getProductMatches;
        // vm.onProductSelected = onProductSelected;
        // vm.calculateTotal = calculateTotal;

        // Initialize
        activate();
		addProduct();
		createOrder();

        ////////////////

        function activate() {
	        var dispensaryId = 266;
	        dispensaryFactory.getByDispensary(dispensaryId).then(
	             function (response) {
	                  wProductsUrl = response.weedMapMenu;

	                  dispensaryProductFactory.getDispensaryProducts(wProductsUrl).then(
	                       function (data) {
	                            vm.categories = data.categories;
	                       }
	                  );
	             }
	        ); 

            dispensaryFactory.getByDispensaryDrivers(dispensaryId).then(
	            function(data) {
	                vm.driverData = data;
	            }
	        );

        }

       	function createOrder() {
       		if (vm.order.id === undefined || null) {
		        orderFactory.addOrder(vm.order).then(
		            function(id) {
		                vm.newOrder = id;
		            }
		        );
		    }
	    }

	    function addProduct() {
	    	vm.order.products.push({ category : undefined, product : undefined, qty : 0 });
	    }

	    vm.onCategorySelected = function(product) {
			product.products = product.category.items;
	    };

	    vm.getProductMatches = function(productRow) {
			var searchTextLower = productRow.searchText.toLowerCase();
			return _.filter(productRow.products,	//jshint ignore:line
				function (p) {return p.name.toLowerCase().indexOf(searchTextLower) >= 0}) 	//jshint ignore:line	
		};

		vm.onProductSelected = function(productRow) {
			productRow.prices = [];
			const product = productRow.product;	//jshint ignore:line
			const prices = product.prices;	//jshint ignore:line
			
			for (var unit in prices)	//jshint ignore:line
				productRow.prices.push({unit: unit, price: prices[unit]})	//jshint ignore:line
	    };

	    vm.calculateTotal = function() {
	    	// Taking the first perameter in the vm.order and in each iteration calling function(p) to 
			// return the total cost for the product...iterating through the products array and 
			// keeping a running total of all the calls in the products array.
			// Check to see if quanity or unit has not been filled if so return zero to that product row
			// otherwise return the quantity multiplied by the price of that unit.
	    	 	return _.sumBy(vm.order.products,	//jshint ignore:line
							function(p) {
								if (!p.quantity || !p.price) return 0;	//jshint ignore:line
									return p.quantity * p.price.price 	//jshint ignore:line
							})	//jshint ignore:line
	    };
    }
})();