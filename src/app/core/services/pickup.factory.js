(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('pickupFactory', pickupFactory);

    pickupFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function pickupFactory($http, $q, toastr, apiUrl) {
        var service = {
            addPickup: addPickup,
            getAllPickups: getAllPickups,
            getByPickup: getByPickup,
            updatePickup: updatePickup
        };

        return service;

        ////////////////////////

        function addPickup(pickup) {
             var defer = $q.defer();

             $http.post(apiUrl + '/pickups', pickup)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                            toastr.success('Successfully added pickup', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding pickup', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getAllPickups() {
             var defer = $q.defer();

             $http.get(apiUrl + '/pickups')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting pickup', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByPickup(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/pickups/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting pickup detail', 'Error');
                       }
                  );

             return defer.promise;
        }

        function updatePickup(pickUp) {
            var defer = $q.defer();

             $http.put(apiUrl + '/pickups/' + pickUp.pickUpId, pickUp)
                  .then(
                       function() {
                            defer.resolve();
                            toastr.success('Successfully updated pickup', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating pickup', 'Error');
                       }
                  );

                  return defer.promise;
        }
    }
})();
