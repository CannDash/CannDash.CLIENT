(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('orderFactory', orderFactory);

    orderFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function orderFactory($http, $q, toastr, apiUrl) {
        var service = {
            addOrder: addOrder,
            getAllOrders: getAllOrders,
            getOrdersByDispensary: getOrdersByDispensary,
            getByOrderId: getByOrderId,
            updateOrder: updateOrder
        };

        return service;

        ////////////////////////

        function addOrder(order) {
             var defer = $q.defer();

             $http.post(apiUrl + '/orders', order)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                         //    toastr.success('Successfully added order', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding order: ' + error.message, 'Error');
                       }
                  );

             return defer.promise;
        }

        function getAllOrders() {
             var defer = $q.defer();

             $http.get(apiUrl + '/orders')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting orders', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getOrdersByDispensary(dispensaryId) {
          var defer = $q.defer();

          $http.get(apiUrl + '/dispensaries/' + dispensaryId + '/orders/')
              .then(
                   function(response) {
                        defer.resolve(response.data);
                   },
                   function(error) {
                        defer.reject(error);
                        toastr.error('Error getting order detail', 'Error');
                   }
              );

          return defer.promise;
        }

        function getByOrderId(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/orders/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting order detail', 'Error');
                       }
                  );

             return defer.promise;
        }

        function updateOrder(order) {
            var defer = $q.defer();

             $http.put(apiUrl + '/orders/' + order.orderId, order)
                  .then(
                       function() {
                            defer.resolve();
                            toastr.success('Successfully updated order', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating order: ' + error.data.exceptionMessage, 'Error');
                            console.error('Error updating order: ' + error.data.exceptionMessage);
                       }
                  );

                  return defer.promise;
        }
    }
})();
