(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('dispensaryFactory', dispensaryFactory);

    dispensaryFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function dispensaryFactory($http, $q, toastr, apiUrl) {
        var service = {
            addDispensary: addDispensary,
            getByDispensary: getByDispensary,
            getByDispensaryCustomers: getByDispensaryCustomers,
            getByDispensaryDrivers: getByDispensaryDrivers,
            getByDispensaryInventory: getByDispensaryInventory,
            getByDispensaryOrders: getByDispensaryOrders
        };
        return service;

        //////////////////////////

        function addDispensary(dispensary) {
             var defer = $q.defer();

             $http.post(apiUrl + '/dispensaries', dispensary)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                            toastr.success('Successfully added dispensary', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding dispensary', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensary(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/dispensaries/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting dispensary detail', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensaryCustomers(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/dispensaries/' + id + '/customers')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting dispensary customers', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensaryDrivers(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/dispensaries/' + id + '/drivers')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting dispensary drivers', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensaryInventory(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/dispensaries/' + id + '/inventories')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting dispensory inventory', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensaryOrders(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/dispensaries/' + id + '/orders')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting dispensory orders', 'Error');
                       }
                  );

             return defer.promise;
        }
    }
})();
