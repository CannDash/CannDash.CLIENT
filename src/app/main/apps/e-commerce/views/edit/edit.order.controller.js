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
									_.map(								//jshint ignore:line
										data.categories,
										function(c) {
											return {
												id: c.menu_item_category_id,	//jshint ignore:line
												name: c.title,
												products: c.items
											};
										});

							   	vm.order.productOrders.forEach(
							   		function (p) {
                                        if (!p.menuCategoryId) return;			//jshint ignore:line

										p.category =
											_.find(									//jshint ignore:line
												vm.categories,
												function (c) {return c.id == p.menuCategoryId})	//jshint ignore:line
										p.product =
											_.find(								//jshint ignore:line
												p.category.products,
												function (product) {
													return product.id == p.productId	//jshint ignore:line
												});

										p.unitPrices = [];
										for (var price in p.product.prices)			//jshint ignore:line
											p.unitPrices.push({					//jshint ignore:line
												unit: price,
												price: p.product.prices[price]
											});

										p.unitPrice =
											_.find(								//jshint ignore:line
												p.unitPrices,
												function (price) {
													return price.unit == p.units //jshint ignore:line
												});
									});
	                       }
	                  );
	             }
	        ); 

            dispensaryFactory.getByDispensaryDriverNames(dispensaryId).then(
	            function(data) {
	                vm.drivers = data.drivers;

	                if (vm.order.driverId)
						vm.order.driver =						//jshint ignore:line
							_.find(data.drivers,				//jshint ignore:line
								function(d) {
									return d.driverId == vm.order.driverId;		//jshint ignore:line
								});												//jshint ignore:line
	            }
	        );

	        dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customers = data.customers;
	            }
            );
        }

        // Functions for buttons
	    vm.addProduct = function () {
			vm.order.productOrders.push({orderQty : 0});
	    };
	    if (vm.order.productOrders.length == 0) vm.addProduct();	//jshint ignore:line

	    vm.onSubmit = function () {
			if (vm.order.customer) vm.order.customerId = vm.order.customer.customerId; //jshint ignore:line

	          const order = {	//jshint ignore:line
	              orderId: vm.order.orderId,
	              dispensaryId: vm.order.dispensaryId,
	              driverId: vm.order.driver.driverId,
	              customerId: vm.order.customer.customerId,
	              deliveryNotes: vm.order.deliveryNotes,
	              street: vm.order.street,
	              unitNo: vm.order.unitNo,
	              city: vm.order.city,
	              state: vm.order.state,
	              zipCode: vm.order.zipCode
	          };
	          order.productOrders =
	              _.map(						//jshint ignore:line
	                  vm.order.productOrders,
	                  function (p) {
	                      return {
	                          orderId: p.orderId,
	                          menuCategoryId: p.category.id,
	                          categoryName: p.category.name,
	                          productId: p.productId,
	                          productName: p.productName,
	                          orderQty: p.orderQty,
	                          price: p.price,
	                          units: p.units,
	                          totalSale: p.orderQty * p.price
	                      };
	                  });

			// Iterate over the products object above, and return the orderQty for each item
			order.itemQuantity = _.sumBy(	//jshint ignore:line
				order.productOrders, 	//jshint ignore:line
				function (p) {
					return p.orderQty;
				});

			// Iterate over the products object above, and return the total for each item 
			order.totalOrderSale = _.sumBy(	//jshint ignore:line
				order.productOrders, 	//jshint ignore:line
				function (p) {
					return p.totalSale;
				});

			if (order.orderId)
				orderFactory.updateOrder(order)	//jshint ignore:line
					.then(
						function () {
							$state.go('app.e-commerce.orders');						//jshint ignore:line
						}
					);

			else {
				orderFactory.addOrder(order).then(   //jshint ignore:line
					function () {
						$state.go('app.e-commerce.orders');                     //jshint ignore:line
					}
				);
			}
		};


	    // Functions for text autocomplete boxes, dropdown menus & form fields
	    vm.onCategorySelected = function(productOrder) {
            productOrder.product = productOrder.orderQty = productOrder.price =
                productOrder.menuCategoryId = productOrder.products = null;
            if (!productOrder.category) return;				//jshint ignore:line

            productOrder.menuCategoryId = productOrder.category.id;
			productOrder.products =
				_.map(									//jshint ignore:line
                    productOrder.category.products,
					function (p) {
						return {
							id: p.id,
							name: p.name,
							prices: p.prices
						};
					}
				);
	    };

	    vm.getProductMatches = function(productOrder) {
			var searchTextLower = productOrder.searchText.toLowerCase();
			
			return _.filter(productOrder.products,											//jshint ignore:line
				function (p) {return p.name.toLowerCase().indexOf(searchTextLower) >= 0}); 	//jshint ignore:line
		};

		vm.getPatientMatches = function(patient) {
			var searchTextLower = patient.searchText.toLowerCase();
			
			return _.filter(vm.customers,													//jshint ignore:line
				function (p) {
					return (p.firstName + p.lastName).toLowerCase().indexOf(searchTextLower) >= 0 //jshint ignore:line
				});																			//jshint ignore:line
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

		vm.onProductSelected = function(productOrder) {
			if (!productOrder.product) return;	//jshint ignore:line

			productOrder.prices = [];	//jshint ignore:line
			const product = productOrder.product;	//jshint ignore:line
			const prices = product.prices;	//jshint ignore:line
            productOrder.unitPrices = [];
            for (var price in prices)			//jshint ignore:line
                productOrder.unitPrices.push({	//jshint ignore:line
                    unit: price,
                    price: prices[price]
                });
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
	    	 	return _.sumBy(vm.order.productOrders,	//jshint ignore:line
					function(p) {
						if (!p.orderQty || !p.price) return 0;	//jshint ignore:line
							return p.orderQty * p.price; 	//jshint ignore:line
					});	//jshint ignore:line
	    };
    }
})();
