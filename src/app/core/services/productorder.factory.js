(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('productOrderFactory', productOrderFactory);

    productOrderFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function productOrderFactory($http, $q, toastr, apiUrl) {
        var service = {
            addProductOrder: addProductOrder,
            getAllProductOrders: getAllProductOrders,
            getByProductOrder: getByProductOrder,
            updateProductOrder: updateProductOrder
        };

        return service;

        //////////////////////

        function addProductOrder(productOrder) {
             var defer = $q.defer();

             $http.post(apiUrl + '/productorders', productOrder)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                            // toastr.success('Successfully added product order', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding product order', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getAllProductOrders() {
             var defer = $q.defer();

             $http.get(apiUrl + '/productorders')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting product order', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByProductOrder(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/productorders/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting product order detail', 'Error');
                       }
                  );

             return defer.promise;
        }

        function updateProductOrder(productOrder) {
            var defer = $q.defer();

             $http.put(apiUrl + '/productorders/' + productOrder.productOrderId, productOrder)
                  .then(
                       function() {
                            defer.resolve();
                            toastr.success('Successfully updated product order', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating product order', 'Error');
                       }
                  );

                  return defer.promise;
        }
    }
})();
