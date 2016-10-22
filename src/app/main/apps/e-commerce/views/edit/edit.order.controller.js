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
    	'$state', 
    	'$stateParams', 
    	'productOrderFactory', 
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
    	$state, 
    	$stateParams, 
    	productOrderFactory, 
    	$ngBootbox) {

        var vm = this;
        var wProductsUrl = null;

        // Initialize
        activate();

        ////////////////

        function activate() {
	        // Initialize data immediately
	        var dispensaryId = 266;
	        vm.order = $stateParams.order || 
		        { 
		        	dispensaryId : dispensaryId,
					productOrders: []
		        };

	        dispensaryFactory.getByDispensary(dispensaryId).then(
	             function (response) {
	                  wProductsUrl = response.weedMapMenu;

	                  dispensaryProductFactory.getDispensaryProducts(wProductsUrl).then(
	                       function (data) {
	                            vm.categories =
									_.map(
										data.categories,
										function(c) {
											return {
												id: c.menu_item_category_id,
												name: c.title,
												products: c.items
											};
										});

							   	vm.order.productOrders.forEach(
							   		function (p) {
                                        if (!p.menuCategoryId) return;

										p.category =
											_.find(
												vm.categories,
												function (c) {return c.id == p.menuCategoryId})
										p.product =
											_.find(
												p.category.products,
												function (product) {
													return product.id == p.productId
												});

										p.unitPrices = [];
										for (var price in p.product.prices)
											p.unitPrices.push({
												unit: price,
												price: p.product.prices[price]
											})

										p.unitPrice =
											_.find(
												p.unitPrices,
												function (price) {
													return price.unit == p.units
												});
									})
	                       }
	                  );
	             }
	        ); 

            dispensaryFactory.getByDispensaryDriverNames(dispensaryId).then(
	            function(data) {
	                vm.drivers = data.drivers;

	                if (vm.order.driverId)
						vm.order.driver =						
							_.find(
							    data.drivers,
								function(d) {
									return d.driverId == vm.order.driverId;		
								});												
	            }
	        );

	        dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customers = data.customers;

                    if (vm.order.customerId)
                        vm.order.customer =
                            _.find(
                                data.customers,
                                function(c) {
                                    return c.customerId == vm.order.customerId;
                                });
	            }
            );
        }

        // Functions for buttons
	    vm.addProduct = function () {
			vm.order.productOrders.push({orderId: vm.order.orderId, orderQty: 0});
	    };
	    if (vm.order.productOrders.length == 0) vm.addProduct();

	    vm.onSubmit = function () {
            // clone our order object so we can delete the parts we don't want to submit
            // (in the clone), without emptying portions of the view
            const order = JSON.parse(JSON.stringify(vm.order));

            order.productOrders.forEach(
                function (productOrder) {
                    productOrder.productId = productOrder.product.id;
                    productOrder.productName = productOrder.product.name;
                    productOrder.totalSale = productOrder.orderQty * productOrder.price;
                    delete productOrder.products;
                    delete productOrder.product;
                    productOrder.categoryName = productOrder.category.name;
                    productOrder.menuCategoryId = productOrder.category.id;
                    delete productOrder.category;
                    productOrder.units = productOrder.unitPrice.unit;
                    productOrder.price = productOrder.unitPrice.price;
                    delete productOrder.unitPrices;
                    delete productOrder.unitPrice;
                });

			order.itemQuantity = _.sumBy(
				order.productOrders, 	
				function (p) {
					return p.orderQty;
				});

			order.totalOrderSale = _.sumBy(
				order.productOrders, 	
				function (p) {
					return p.totalSale;
				});

            order.driverId = vm.order.driver.driverId;
            delete order.driver;
            order.customerId = vm.order.customer.customerId;
            delete order.customer;

			if (order.orderId)
				orderFactory.updateOrder(order)	
					.then(
						function () {
							$state.go('app.e-commerce.orders');						
						}
					);

			else {
				orderFactory.addOrder(order).then(   
					function () {
						$state.go('app.e-commerce.orders');                     
					}
				);
			}
		};

	    // Functions for text autocomplete boxes, dropdown menus & form fields
	    vm.onCategorySelected = function(productOrder) {
            productOrder.product = productOrder.orderQty = productOrder.price =
                productOrder.menuCategoryId = productOrder.products = null;
            if (!productOrder.category) return;

            productOrder.menuCategoryId = productOrder.category.id;
			productOrder.products =
				_.map(
                    productOrder.category.products,
					function (p) {
						return {
							id: p.id,
							name: p.name,
							prices: p.prices
						}
					}
				);
	    };

	    vm.getProductMatches = function(productOrder) {
			var searchTextLower = productOrder.searchText.toLowerCase();
			
			return _.filter(productOrder.products,											
				function (p) {return p.name.toLowerCase().indexOf(searchTextLower) >= 0}); 	
		};

		vm.getPatientMatches = function() {
			var searchTextLower = vm.patientSearchText.toLowerCase();
			
			return _.filter(vm.customers,													
				function (p) {
					return (p.firstName + p.lastName).toLowerCase().indexOf(searchTextLower) >= 0 
				});																			
		};

		vm.onPatientSelected = function(patient) {
			const order = vm.order;						

			order.street = patient.street;
			order.unitNo = patient.unitNo;
			order.city = patient.city;
			order.state = patient.state;
			order.zipCode = patient.zipCode;	
			order.deliveryNotes = patient.deliveryNotes;
 	    };

		vm.onProductSelected = function(productOrder) {
			if (!productOrder.product) return;

			const product = productOrder.product;
			const prices = product.prices;	
            productOrder.unitPrices = [];
            for (var price in prices)
                productOrder.unitPrices.push({
                    unit: price,
                    price: prices[price]
                })
	    };

	    vm.onUnitPriceSelected = function(productOrder) {
			productOrder.units = productOrder.unitPrice.unit;
			productOrder.price = productOrder.unitPrice.price;
		};

	    vm.calculateTotal = function() {
	    	// Taking the first perameter in the vm.order and in each iteration calling function(p) to 
			// return the total cost for the product...iterating through the products array and 
			// keeping a running total of all the calls in the products array.
			// Check to see if quanity or unit has not been filled if so return zero to that product row
			// otherwise return the quantity multiplied by the price of that unit.
	    	 	return _.sumBy(vm.order.productOrders,	
					function(p) {
						if (!p.orderQty || !p.price) return 0;	
							return p.orderQty * p.price; 	
					});	
	    };
    }
})();
