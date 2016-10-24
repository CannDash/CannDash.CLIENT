(function ()
{
    'use strict';

    angular
        .module('app.pages.homepage',
            [
                // 3rd Party Dependencies
                'timer'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_homepage', {
            url      : '/',
            views    : {
                'main@'                        : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_homepage': {
                    templateUrl: 'app/main/pages/homepage/homepage.html',
                    controller : 'HomepageController as vm'
                }
            },
            bodyClass: 'homepage'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.homepage', {
            title : 'Home Page',
            icon  : 'icon-home',
            state : 'app.pages_homepage',
            weight: 1
        });
    }

})();