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
        vm.price = [];
        vm.order = {};
        vm.order.products = [];
        vm.categories = [];

        vm.addProduct = addProduct;

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
			return _.filter(productRow.products,
				function (p) {return p.name.toLowerCase().indexOf(searchTextLower) >= 0})		
		};

		vm.onProductSelected = function(productRow) {
			productRow.prices = [];
			const product = productRow.product;
			const prices = product.prices;
			
			for (var unit in prices)
				productRow.prices.push({unit: unit, price: prices[unit]})
	    };

	    vm.calculateTotal = function() {
	    	return _.sumBy(vm.order.products, function(p) {return p.quantity * p.price.price})
	    };
    }
})();