(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('dashboardFactory', dashboardFactory);

    dashboardFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function dashboardFactory($http, $q, toastr, apiUrl) {
        var service = {
            getDashboardData : getDashboardData
        };
        return service;

        ////////////////

        // Get Dispensary admin dashboard data
        function getDashboardData(id) {
        	var defer = $q.defer();
        
            $http.get(apiUrl + '/dashboard/' + id )
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Getting dispensary admin dashboard from database failed', 'Error');
                    }
                );
        
                return defer.promise;       
        }
    }
})();