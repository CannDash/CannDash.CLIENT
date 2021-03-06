(function() {
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('OrdersController', OrdersController);

    /** @ngInject */
    function OrdersController($state, Statuses, Orders, orderFactory) {
        var vm = this;
        var dispensaryId = 266;

        // Data
        vm.orders = Orders.data;
        vm.statuses = Statuses.data;

        vm.dtInstance = {};
        vm.dtOptions = {
            dom: 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            order: [[0, 'desc']],
            columnDefs: [{
                // Target the date column
                targets: 0,
                width: '72px',
                type: 'date'
            }, {
                // Target the ID column
                targets: 1,
                width: '72px'
            }, {
                // Target the status column
                targets: 5,
                render: function(data, type) {
                    if (type === 'display') {
                        var orderStatus = vm.getOrderStatus(data);
                        if (orderStatus) {
                            return '<span class="status ' + orderStatus.color + '">' + 
                                                            orderStatus.name + '</span>';
                        } else {
                            return '<span class="status md-yellow-500-bg">Pending</span>';
                        }
                    }

                    if (type === 'filter') {
                        return vm.getOrderStatus(data);
                    }

                    return data;
                }
            }, {
                // Target the actions column
                targets: 6,
                responsivePriority: 1,
                filterable: false,
                sortable: false
            }],
            initComplete: function() {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if (searchBox.length > 0) {
                    searchBox.on('keyup', function(event) {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType: 'simple',
            lengthMenu: [10, 20, 30, 50, 100],
            pageLength: 20,
            scrollY: 'auto',
            responsive: true
        };

        // Methods
        vm.getOrderStatus = getOrderStatus;
        vm.gotoOrderDetail = gotoOrderDetail;
        vm.createNewOrder = createNewOrder;

        //////////

        /**
         * Get order status
         */
        function getOrderStatus(id) {
            for (var i = 0; i < vm.statuses.length; i++) {
                if (vm.statuses[i].id === parseInt(id)) {
                    return vm.statuses[i];
                }
            }
        }

        /**
         * Create new order
         */
        function createNewOrder() {
            $state.go('app.e-commerce.edit-order');
        }  

        /**
         * Go to order detail
         */
        function gotoOrderDetail(id) {
            $state.go('app.e-commerce.order', { id: id });
        }
            orderFactory.getOrdersByDispensary(dispensaryId).then(
                function(data) {
                    vm.dispensaryOrders = data;
                }
            );
    }
})();

