(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('dispensaryProductFactory', dispensaryProductFactory);

    dispensaryProductFactory.$inject = ['$http', '$q', 'toastr', ];

    /* @ngInject */
    function dispensaryProductFactory($http, $q, toastr) {
        var service = {
            getDispensaryProducts: getDispensaryProducts
        };

        return service;

        function getDispensaryProducts(url) {
             var defer = $q.defer();

             $http.get(url)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting dispensary product listing', 'Error');
                       }
                  );

             return defer.promise;
        }
    }
})();
