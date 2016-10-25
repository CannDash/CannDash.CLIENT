(function ()
{
    'use strict';

    angular
        .module('app.pages.maintenance', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_maintenance', {
            url      : '/maintenance',
            views    : {
                'main@'                        : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_maintenance': {
                    templateUrl: 'app/main/pages/maintenance/maintenance.html',
                    controller : 'MaintenanceController as vm'
                }
            },
            bodyClass: 'maintenance'
        });
    }

})();