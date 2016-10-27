(function ()
{
    'use strict';

    angular
        .module('app.pages.profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.pages_profile_patient', {
            url      : '/dispensary/patient-profile',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/profile/profile.html',
                    controller : 'ProfileController as vm'
                }
            },
            resolve  : {
                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
            },
            bodyClass: 'profile'
        });

        $stateProvider.state('app.pages_profile_driver', {
            url      : '/dispensary/driver-profile',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/profile/profile.html',
                    controller : 'DriverController as vm'
                }
            },
            resolve  : {
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
            },
            bodyClass: 'profile'
        });

        // Api
        msApiProvider.register('profile.about', ['app/data/profile/about.json']);

    }

})();