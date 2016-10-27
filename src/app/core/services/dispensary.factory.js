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
            getByDispensaryCustomerNames: getByDispensaryCustomerNames,
            getByDispensaryDrivers: getByDispensaryDrivers,
            getByDispensaryDriverNames: getByDispensaryDriverNames,
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
                            toastr.error('Error adding dispensary: ' + error.message, 'Error');
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
                            toastr.error('Error getting dispensary by ID: ' + error.message, 'Error');
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
                            toastr.error('Error getting dispensary customers: ' + error.message, 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensaryCustomerNames(id) {
            var defer = $q.defer();

            $http.get(apiUrl + '/dispensaries/' + id + '/customerNames')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error(
                            'Error getting dispensary customer names: ' + error.message, 'Error');
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
                            toastr.error('Error getting dispensary drivers: ' + error.message, 'Error');
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
                            toastr.error('Error getting dispensory inventory: ' + error.message, 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDispensaryDriverNames(id) {
            var defer = $q.defer();

            $http.get(apiUrl + '/dispensaries/' + id + '/driverNames')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Error getting dispensary driver names: ' + error.message, 'Error');
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
                            toastr.error('Error getting dispensory orders: ' + error.message, 'Error');
                       }
                  );

             return defer.promise;
        }
    }
})();