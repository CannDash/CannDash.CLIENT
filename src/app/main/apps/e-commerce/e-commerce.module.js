(function ()
{
    'use strict';

    angular
        .module('app.e-commerce',
            [
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable',
                'ui.bootstrap',
                'ngBootbox'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.e-commerce', {
                abstract: true,
                url     : '/dispensary'
            })
            // Products grid
            .state('app.e-commerce.products', {
                url      : '/products',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/products/products.html',
                        controller : 'ProductsController as vm'
                    }
                },
                resolve  : {
                    Products: function (msApi)
                    {
                        return msApi.resolve('e-commerce.products@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
                // Product detail
	            .state('app.e-commerce.products.detail', {
	                url      : '/:id',
	                views    : {
	                    'content@app': {
	                        templateUrl: 'app/main/apps/e-commerce/views/product/product.html',
	                        controller : 'ProductController as vm'
	                    }
	                },
	                resolve  : {
	                    Product: function (msApi)
	                    {
	                        return msApi.resolve('e-commerce.product@get');
	                    }
	                },
	                bodyClass: 'e-commerce'
	            })
            // Orders grid
            .state('app.e-commerce.orders', {
                url      : '/orders',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/orders/orders.html',
                        controller : 'OrdersController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('e-commerce.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // Order detail
            .state('app.e-commerce.order', {
                url      : '/order/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/order/order.html',
                        controller : 'OrderController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // Edit order detail
            .state('app.e-commerce.edit-order', {
                url      : '/edit-order/:id',   // need orderId to pass through with this state!!
                params	: { order : null },
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/edit/edit.order.html',
                        controller : 'EditOrderController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // Patients grid
            .state('app.e-commerce.patients', {
                url      : '/patients',   
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/patients/patients.html',
                        controller : 'PatientsController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // Patient detail
            .state('app.e-commerce.patient', {
                url      : '/patient/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/patient/patient.html',
                        controller : 'PatientController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // Edit patient
            .state('app.e-commerce.edit-patient', {
                url      : '/patient/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/patient-edit/patient-edit.html',
                        controller : 'EditPatientController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            });

        // Api
        msApiProvider.register('e-commerce.products', ['']);
        msApiProvider.register('e-commerce.product', ['']);
        msApiProvider.register('e-commerce.orders', ['app/data/e-commerce/orders.json']);
        msApiProvider.register('e-commerce.statuses', ['app/data/e-commerce/statuses.json']);
        msApiProvider.register('e-commerce.order', ['app/data/e-commerce/orders.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.e-commerce', {
            title : 'Manage',
            icon  : 'icon-cart',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('apps.e-commerce.orders', {
            title: 'Orders',
            state: 'app.e-commerce.orders'
        });

        msNavigationServiceProvider.saveItem('apps.e-commerce.products', {
            title: 'Products',
            state: 'app.e-commerce.products'
        });

        msNavigationServiceProvider.saveItem('apps.e-commerce.patients', {
            title: 'Patients',
            state: 'app.e-commerce.patients'
        });       

        msNavigationServiceProvider.saveItem('apps.e-commerce.patient', {
            title: 'Patient Detail',
            state: 'app.e-commerce.patient'
        });       
    }
})();
