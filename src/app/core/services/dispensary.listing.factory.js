(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('dispensaryListingFactory', dispensaryListingFactory);

    dispensaryListingFactory.$inject = ['$http', '$q', 'toastr', 'wpUrl', ];

    /* @ngInject */
    function dispensaryListingFactory($http, $q, toastr, wpUrl) {
        var service = {
            getAllListings: getAllListings
        };
        return service;

        ////////////////

        function getAllListings() {
	 		var defer = $q.defer();
		
			$http.get(wpUrl)
				.then(
					function(response) {
						defer.resolve(response.data);
					},
					function(error) {
						defer.reject(error);
						toastr.error('Error getting dispensary listings', 'Error');
					}
				);
		
			return defer.promise;
		}
    }
})();