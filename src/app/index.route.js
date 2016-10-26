(function ()
{
    'use strict';

    angular
        .module('cannDash')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, angularAuth0Provider)
    {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        // Inject $cookies
        var $cookies;

        angular.injector(['ngCookies']).invoke([
            '$cookies', function (_$cookies)
            {
                $cookies = _$cookies;
            }
        ]);

        // Get active layout
        var layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigation';

        var layouts = {
            verticalNavigation  : {
                main      : 'app/core/layouts/vertical-navigation.html',
                toolbar   : 'app/toolbar/layouts/vertical-navigation/toolbar.html',
                navigation: 'app/navigation/layouts/vertical-navigation/navigation.html'
            },
        };
        // END - Layout Style Switcher

        //Initialization for the angular-auth0 library
         angularAuth0Provider.init({
           clientID: AUTH0_CLIENT_ID,
           domain: AUTH0_DOMAIN,
           callbackURL: AUTH0_CALLBACK_URL + '/dashboard',
           callbackOnLocationHash: true
         });

        // State definitions
        $stateProvider
            .state('app', {
                abstract: true,
                views   : {
                    'main@'         : {
                        templateUrl: layouts[layoutStyle].main,
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'   : {
                        templateUrl: layouts[layoutStyle].toolbar,
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: layouts[layoutStyle].navigation,
                        controller : 'NavigationController as vm'
                    }
                }
            });
    }

})();
