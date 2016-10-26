(function() {
    'use strict';

    angular
        .module('app.dashboards.project')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = [
    	'$http', 
    	'$q', 
    	'$stateParams', 
    	'weatherApi', 
    	'keys', 
    	'toastr'];

    /* @ngInject */
    function weatherFactory(
    	$http, 
    	$q, 
    	$stateParams, 
    	weatherApi, 
    	keys, 
    	toastr) 
    {

        var service = {
            getWeather: getWeather
        };

        return service;

        ////////////////

        function getWeather(city) {
        	var defer = $q.defer();

        	$http.get(weatherApi + city + '&appid=' + keys.weather	).then(
        		function(response) {
        			defer.resolve(response.data);
        		},
        		function(error) {
		            defer.reject(error);
		            toastr.error('Error geting weather Info: ' + error.message, 'Error');
        		}
        	);

        	return defer.promise;
        }
    }
})();