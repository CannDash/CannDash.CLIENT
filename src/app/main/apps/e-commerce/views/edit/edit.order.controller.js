(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('EditOrderController', EditOrderController);

    EditOrderController.$inject = ['$http', '$q', 'toastr', 'apiUrl', 'orderFactory', 'dispensaryFactory', 'dispensaryProductFactory', '$state', '$stateParams'];

    /* @ngInject */
    function EditOrderController($http, $q, toastr, apiUrl, orderFactory, dispensaryFactory, dispensaryProductFactory, $state, $stateParams) {
        var vm = this;
        var wProductsUrl = null;

        // Methods
        vm.addProduct = addProduct;
        // vm.onCategorySelected = onCategorySelected;
        // vm.getProductMatches = getProductMatches;
        // vm.onProductSelected = onProductSelected;
        // vm.calculateTotal = calculateTotal;
        vm.addOrder = addOrder;

        // Initialize
        activate();
		addProduct();

        ////////////////

        function activate() {
	        // Initialize data immediately
	        var dispensaryId = 266;
	        vm.order = $stateParams.order || 
		        { 
		        	dispensaryId : dispensaryId
		        };
		    if (vm.order.customerInfo) vm.order.customer = vm.order.customerInfo;
	        vm.productRows = [];
	        vm.categories = [];

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
	                vm.drivers = 
	                	_.filter(data.drivers, 								//jshint ignore:line
	                		function(d) {return d.driverCheckIn});	//jshint ignore:line

	                if (vm.order.driverId)
						vm.order.driver =						//jshint ignore:line
							_.find(data.drivers,				//jshint ignore:line
								function(d) {
									return d.driverId == vm.order.driverId		//jshint ignore:line
								})												//jshint ignore:line
				//jshint ignore:line
	            }
	        );

	        dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customers = data.customers;
	            }
            );

            if (vm.order.productOrders) {
            	vm.order.productOrders.forEach(
            		function(order) {
            			vm.productRows.push({ 
            				product: {
            					id: order.productId,
            					name: order.productName,
            					category_id: order.categoryId,				//jshint ignore:line
            					category_name: order.category_name	//jshint ignore:line
            				},	
            				quantity: order.orderQty,
            				price: {
            					unit: order.price.unit,
            					price: order.price.price
            				}
           				})	//jshint ignore:line
            		})	//jshint ignore:line
            }
        }

	    function addProduct() {
	    	vm.productRows.push({ category : undefined, product : undefined, qty : 0 });
	    }

	    function addOrder() {
            var defer = $q.defer();	   
            			
            // If does not exist, create order anyway 
            if (vm.patient) vm.order.customerId = vm.patient.customerId;	//jshint ignore:line

			const products = vm.order.productOrders = [];					//jshint ignore:line
			
			// Iterate over the vm.product rows array that user entered in the order.
			// 
			vm.productRows.forEach(
				function(productRow) {								//jshint ignore:line
					products.push({												//jshint ignore:line
						productId: productRow.product.id,
						productName: productRow.product.name,
						categoryId: productRow.product.category_id,	//jshint ignore:line
						categoryName: productRow.product.category_name,	//jshint ignore:line
						orderQty: productRow.quantity,	
						unitPrice: productRow.price.price,	
						total: productRow.quantity * productRow.price.price  
					})	//jshint ignore:line
				});


			// Iterate over the products object above, and return the orderQty for each item
			vm.order.itemQuantity = _.sumBy(products, 	//jshint ignore:line
										function(o) { 
											return o.orderQty; 
									});
			
			// Iterate over the products object above, and return the total for each item 
			vm.order.totalCost = _.sumBy(products, 	//jshint ignore:line
										function(o) { 
											return o.total; 
									});

	    	if (vm.order.orderId)
	    		orderFactory.updateOrder(vm.order)	//jshint ignore:line
			    	.then(
			    		function(data) {
			    			$state.go('app.e-commerce.orders');						//jshint ignore:line
						}	
			    	);	

		    else 
		    	orderFactory.addOrder(vm.order).then(	//jshint ignore:line
		    		function(data) {
		    			$state.go('app.e-commerce.orders');						//jshint ignore:line
					}	
		    	);		
	    	};																	//jshint ignore:line

	    vm.onCategorySelected = function(product) {
			product.products = product.category.items;
	    };

	    vm.getProductMatches = function(productRow) {
			var searchTextLower = productRow.searchText.toLowerCase();
			
			return _.filter(productRow.products,											//jshint ignore:line
				function (p) {return p.name.toLowerCase().indexOf(searchTextLower) >= 0}) 	//jshint ignore:line	
		};

		vm.getPatientMatches = function(patient) {
			var searchTextLower = patient.searchText.toLowerCase();
			
			return _.filter(vm.customers,													//jshint ignore:line
				function (p) {
					return (p.firstName + p.lastName).toLowerCase().indexOf(searchTextLower) >= 0 //jshint ignore:line
				}) 																				//jshint ignore:line
		};

		vm.onPatientSelected = function(patient) {
			const order = vm.order;						//jshint ignore:line

			order.street = patient.street;
			order.unitNo = patient.unitNo;
			order.city = patient.city;
			order.state = patient.state;
			order.zipCode = patient.zipCode;	
			order.deliveryNotes = patient.deliveryNotes;
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
	    	 	return _.sumBy(vm.productRows,	//jshint ignore:line
							function(p) {
								if (!p.quantity || !p.price) return 0;	//jshint ignore:line
									return p.quantity * p.price.price 	//jshint ignore:line
							})	//jshint ignore:line
	    };
    }
})();