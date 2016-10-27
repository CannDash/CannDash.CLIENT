(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.auth.login',
            'app.pages.auth.register',
            'app.pages.auth.forgot-password',
            'app.pages.auth.reset-password',
            'app.pages.homepage',
            'app.pages.error-404',
            'app.pages.error-500',
            'app.pages.maintenance'
        ]);
})();