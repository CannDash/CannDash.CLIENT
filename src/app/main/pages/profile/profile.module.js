(function ()
{
    'use strict';

    angular
        .module('app.pages.profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.pages_profile_patient', {
            url      : '/admin/patient-details',
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
            url      : '/admin/driver-details',
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

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/profile');

        // Api
        msApiProvider.register('profile.about', ['app/data/profile/about.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('pages_profile_patient', {
            title : 'Patient Details',
            icon  : 'icon-account',
            state : 'app.pages_profile',
            weight: 6
        });
    }

})();