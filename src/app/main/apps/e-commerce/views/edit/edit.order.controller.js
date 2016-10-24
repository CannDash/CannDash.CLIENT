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
		customerFactory,
    	$state, 
    	$stateParams, 
    	productOrderFactory, 
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
									_.map(			//jshint ignore:line
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
                                        if (!p.menuCategoryId) return;	//jshint ignore:line

										p.category =
											_.find(	//jshint ignore:line
												vm.categories,
												function (c) {
													return c.id == p.menuCategoryId})	//jshint ignore:line
										p.product =
											_.find(	//jshint ignore:line
												p.category.products,
												function (product) {
													return product.id == p.productId	//jshint ignore:line
												});

										p.unitPrices = [];
										for (var price in p.product.prices)	//jshint ignore:line
											p.unitPrices.push({	//jshint ignore:line
												unit: price,
												price: p.product.prices[price]
											});	

										p.unitPrice =
											_.find(	//jshint ignore:line
												p.unitPrices,
												function (price) {
													return price.unit == p.units 	//jshint ignore:line
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
						vm.order.driver =	//jshint ignore:line					
							_.find(	//jshint ignore:line
							    data.drivers,
								function(d) {
									return d.driverId == vm.order.driverId;		//jshint ignore:line
								});												
	            }
	        );

	        dispensaryFactory.getByDispensaryCustomers(dispensaryId).then(
                function(data) {
                    vm.customers =
						_.map(	//jshint ignore:line
							data,
							function (c) {
								const customer = c.customer;	//jshint ignore:line
								customer.address = c.address;
								return customer;
							});

                    if (vm.order.customerId) {
						previousPatient = vm.order.customer =	//jshint ignore:line
							_.find(	//jshint ignore:line
								vm.customers,
								function (c) {
									return c.customerId == vm.order.customerId;	//jshint ignore:line
								});
						fetchCustomerAddresses();
					}
	            }
            );
        }

        ///////////////

        // Functions for buttons
	    vm.addProduct = function () {
			vm.order.productOrders.push({orderId: vm.order.orderId, orderQty: 0});
	    };
	    if (vm.order.productOrders.length == 0) vm.addProduct();	//jshint ignore:line

	    vm.onSubmit = function () {
            // clone our order object so we can delete the parts we don't want to submit
            // (in the clone), without emptying portions of the view
            const order = JSON.parse(JSON.stringify(vm.order));	//jshint ignore:line

            order.productOrders.forEach(
                function (productOrder) {
                    productOrder.productId = productOrder.product.id;
                    productOrder.productName = productOrder.product.name;
                    productOrder.discount = productOrder.discount;
                    productOrder.totalSale = 
                    	(productOrder.orderQty * productOrder.price) -
                    	 	(productOrder.discount || 0);
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

			order.itemQuantity = _.sumBy(	//jshint ignore:line
				order.productOrders, 	
				function (p) {
					return p.orderQty;
				});

			order.totalOrderSale = _.sumBy(	//jshint ignore:line
				order.productOrders, 	
				function (p) {
					return p.totalSale;
				});

            order.driverId = vm.order.driver.driverId;
            delete order.driver;
            order.customerId = vm.order.customer.customerId;
            delete order.customer;

			if (order.orderId)
				orderFactory.updateOrder(order)		//jshint ignore:line
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

		vm.deleteOrderItem = function(product) {
			_.pull(vm.order.productOrders, product);	//jshint ignore:line
            //vm.order.productOrders.splice(vm.order.productOrders.indexOf(product));
        };

		/**
         * Go to order detail
         */
        function gotoOrderDetail(id) {
            $state.go('app.e-commerce.order', { id: id });
        }
	    
		    var dispensaryId = 266;
	        
	        orderFactory.getOrdersByDispensary(dispensaryId).then(
	            function(data) {
	                vm.dispensaryOrders = data;
	            }
	        );


        ///////////////


	    // Functions for text autocomplete boxes, dropdown menus & form fields
	    vm.onCategorySelected = function(productOrder) {
            productOrder.product = productOrder.orderQty = productOrder.price =
                productOrder.menuCategoryId = productOrder.products = null;
            // 
            if (!productOrder.category) return;	//jshint ignore:line
            //
            productOrder.menuCategoryId = productOrder.category.id;
			productOrder.products =
				_.map(	//jshint ignore:line
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
			
			return _.filter(productOrder.products,		//jshint ignore:line
				function (p) {
					return p.name.toLowerCase()
							.indexOf(searchTextLower) >= 0}); //jshint ignore:line	
		};

		vm.getPatientMatches = function() {
			var searchTextLower = vm.patientSearchText.toLowerCase();
			
			return _.filter(vm.customers,	//jshint ignore:line				
				function (p) {
					return (p.firstName + p.lastName)
							.toLowerCase()
							.indexOf(searchTextLower) >= 0 //jshint ignore:line
				});																			
		};

		vm.onPatientSelected = function(patient) {
			const order = vm.order;		//jshint ignore:line				
            
            if (!patient || patient == previousPatient) 	//jshint ignore:line
            	return;	//jshint ignore:line
            
            vm.order.customerId = vm.order.customer.customerId; 

			previousPatient = patient;
			var address = patient.address;
			if (address) copyAddressToOrder(address, vm.order);

			fetchCustomerAddresses();
 	    };

		vm.onProductSelected = function(productOrder) {
			if (!productOrder.product) return;	//jshint ignore:line

			const product = productOrder.product;	//jshint ignore:line
			const prices = product.prices;			//jshint ignore:line
            
            productOrder.unitPrices = [];
            
            for (var price in prices)				//jshint ignore:line
                productOrder.unitPrices.push({		//jshint ignore:line
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
					if (!p.orderQty || !p.price) return 0;		//jshint ignore:line
					return (p.orderQty * p.price) - (p.discount || 0); 	
				});	
	    };

		function fetchCustomerAddresses() {
			vm.customerAddresses = null;
			customerFactory.getCustomerAddresses(vm.order.customerId).then(
				function (addresses) {
					vm.customerAddresses = addresses;
				});
		}

		function copyAddressToOrder(address, order) {
			order.street = address.street;
			order.unitNo = address.unitNo;
			order.city = address.city;
			order.state = address.state;
			order.zipCode = address.zipCode;
			order.deliveryNotes = address.deliveryNotes;
		}

		vm.onAddressSelected = function() {
			const address = vm.address;
			if (address) copyAddressToOrder(address, vm.order);
		};
    }
})();


