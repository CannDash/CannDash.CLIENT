(function ()
{
    'use strict';

    angular
        .module('app.dashboards',
            [
                'app.dashboards.project',
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
    }

})();