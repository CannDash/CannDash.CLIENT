(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('driverFactory', driverFactory);

    driverFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function driverFactory($http, $q, toastr, apiUrl) {
        var service = {
            addDriver: addDriver,
            getAllDrivers: getAllDrivers,
            getByDriver: getByDriver,
            updateDriver: updateDriver
        };

        return service;

        ////////////////////////

        function addDriver(driver) {
             var defer = $q.defer();

             $http.post(apiUrl + '/drivers', driver)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                            toastr.success('Successfully added driver', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding driver', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getAllDrivers() {
             var defer = $q.defer();

             $http.get(apiUrl + '/drivers')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting driver', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByDriver(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/drivers/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting driver detail', 'Error');
                       }
                  );

             return defer.promise;
        }

        function updateDriver(driver) {
            var defer = $q.defer();

             $http.put(apiUrl + '/driver/' + driver.driverId, driver)
                  .then(
                       function() {
                            defer.resolve();
                            toastr.success('Successfully updated driver', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating driver', 'Error');
                       }
                  );

                  return defer.promise;
        }
    }
})();
