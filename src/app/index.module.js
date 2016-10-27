(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('cannDash', [

            // Common 3rd Party Dependencies
            'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',
            'ngBootbox',
            
            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Apps
            'app.dashboards',
            'app.e-commerce',

            // Pages
            'app.pages'

        ]);
})();
