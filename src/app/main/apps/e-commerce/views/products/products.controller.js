(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('ProductsController', ProductsController);

    /** @ngInject */
    function ProductsController(
        $state, 
        Products, 
        dispensaryProductFactory, 
        dispensaryFactory)
    {

        var vm = this;
        var wProductsUrl = null;

        // Data
        //vm.products = Products.data;
        var dispensaryId = 266;

        dispensaryFactory.getByDispensary(dispensaryId).then(
             function (response) {
                  wProductsUrl = response.weedMapMenu;

                  dispensaryProductFactory.getDispensaryProducts(wProductsUrl).then(
                       function (data) {
                            vm.products =
                                _.flatMap(data.categories, function (c) {return c.items}); //jshint ignore:line
                       }
                  );
             }
        ); 

        vm.dtInstance = {};
        
        // Options for pagination
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the image column
                    targets   : 0,
                    filterable: false,
                    sortable  : false,
                    width     : '80px'
                },
            ],
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

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

        // Methods
        vm.gotoProductDetail = gotoProductDetail;

        //////////

        /**
         * Go to product detail
         */
        function gotoProductDetail(id)
        {
            $state.go('app.e-commerce.products.detail', {id: id});
        }
    }
})();