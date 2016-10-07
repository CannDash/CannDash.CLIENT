(function() {
  'use strict';

  angular
    .module('cannDash')
    .factory('customerFactory', customerFactory);

  customerFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

  /* @ngInject */
  function customerFactory($http, $q, toastr, apiUrl) {
    var service = {
      addCustomer: addCustomer,
      getAllCustomers: getAllCustomers,
      getByCustomer: getByCustomer,
      updateCustomer: updateCustomer
    };

    return service;

    //////////////////////

    function addCustomer(customer) {
      var defer = $q.defer();

      $http.post(apiUrl + '/customers', customer)
        .then(
          function(response) {
            defer.resolve(response.data);
            toastr.success('Successfully added customer', 'Saved');
          },
          function(error) {
            defer.reject(error);
            toastr.error('Error adding customer', 'Error');
          }
        );

      return defer.promise;
    }

    // Get patientGrid by dispensaryId
    function getAllCustomers(id) {
      var defer = $q.defer();

      // Pass in dispensaryID to this APi url
      $http.get(apiUrl + '/dispensaries/' + id + '/customers')
        .then(
          function(response) {
            defer.resolve(response.data);
          },
          function(error) {
            defer.reject(error);
            toastr.error('Error getting customers', 'Error');
          }
        );

      return defer.promise;
    }

    // Get customerDetail by dispensaryId
    function getByCustomer(id) {
      var defer = $q.defer();
      // Pass in dispensaryID to this APi url
      $http.get(apiUrl + '/dispensaries/customers' + id )
        .then(
          function(response) {
            defer.resolve(response.data);
          },
          function(error) {
            defer.reject(error);
            toastr.error('Error getting customer detail', 'Error');
          }
        );

      return defer.promise;
    }

    function updateCustomer(customer) {
      var defer = $q.defer();

      $http.put(apiUrl + '/customers/' + customer.customerId, customer)
        .then(
          function() {
            defer.resolve();
            toastr.success('Successfully updated customer', 'Saved');
          },
          function(error) {
            defer.reject(error);
            toastr.error('Error updating customer', 'Error');
          }
        );

      return defer.promise;
    }
  }
})();
