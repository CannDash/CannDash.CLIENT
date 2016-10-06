(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('inventoryFactory', inventoryFactory);

    inventoryFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function inventoryFactory($http, $q, toastr, 'apiUrl') {
        var service = {
            addInventory: addInventory,
            getAllInventory: getAllInventory,
            getByInventory: getByInventory,
            updateInventory: updateInventory
        };

        return service;

        //////////////////////

        function addInventory(inventory) {
             var defer = $q.defer();

             $http.post(apiUrl + '/inventories', inventory)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                            toastr.success('Successfully added inventory', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding inventory', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getAllInventory() {
             var defer = $q.defer();

             $http.get(apiUrl + '/inventories')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting inventory', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByInventory(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/inventories/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting inventory detail', 'Error');
                       }
                  );

             return defer.promise;
        }

        function updateInventory(inventory) {
            var defer = $q.defer();

             $http.put(apiUrl + '/inventories/' + inventory.inventoryId, inventory)
                  .then(
                       function() {
                            defer.resolve();
                            toastr.success('Successfully updated inventory', 'Saved');
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating inventory', 'Error');
                       }
                  );

                  return defer.promise;
        }
    }
})();
