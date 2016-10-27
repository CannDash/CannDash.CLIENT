(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(About)
    {
        var vm = this;

        // Data
        vm.about = About.data;

        // Methods

        //////////
    }

})();
