(function ()
{
    'use strict';

    angular
        .module('app.dashboards',
            [
                'app.dashboards.project',
                // 'app.dashboards.server',
                // 'app.dashboards.analytics'
            ]
        )
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('apps', {
            title : 'ADMIN',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('apps.dashboards', {
            title : 'Dashboard',
            icon  : 'icon-tile-four',
            state: 'app.dashboards_project',
            weight: 1
        });

        // msNavigationServiceProvider.saveItem('apps.dashboards.server', {
        //     title: 'Server',
        //     state: 'app.dashboards_server'
        // });

        // msNavigationServiceProvider.saveItem('apps.dashboards.analytics', {
        //     title: 'Analytics',
        //     state: 'app.dashboards_analytics'
        // });
    }

})();