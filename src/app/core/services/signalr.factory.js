(function() {
    'use strict';

    angular
        .module('cannDash')
        .factory('signalRHubProxyFactory', signalRHubProxyFactory);

    signalRHubProxyFactory.$inject = ['$rootScope', 'backendServerUrl', '$q'];

    /* @ngInject */
    function signalRHubProxyFactory($rootScope, backendServerUrl, $q) {
        var connection = $.hubConnection(backendServerUrl);
        var proxy = connection.createHubProxy('orderHub');
        var service = {
            on: on,
            off: off,
            invoke: invoke,
            startSignalR: startSignalR,
            connection: connection
        };

        return service;

        function on(eventName, callback) {
               proxy.on(eventName, function (result) {
                   $rootScope.$apply(function () {
                       if (callback) {
                           callback(result);
                       }
                   });
               });
           }

           function off(eventName, callback) {
               proxy.off(eventName, function (result) {
                   $rootScope.$apply(function () {
                       if (callback) {
                           callback(result);
                       }
                   });
               });
           }

           function invoke(methodName, params, callback) {
               proxy.invoke(methodName, params)
                   .done(function (result) {
                       $rootScope.$apply(function () {
                           if (callback) {
                               callback(result);
                           }
                       });
                   });
           }

           function startSignalR(dispensaryId) {
                connection.start()
                     .done(function () {
                          console.log('Now connected, connection ID=' + connection.id);
                          await proxy.invoke('subscribe', {dispensaryId: dispensaryId})
                              .done(function () {console.log ('Invocation of Subscribe succeeded');})
                              .fail(function (error) {console.log('Invocation of Subscribe failed. Error: ' + error);})
                     })
                     .fail(function (error) {console.log('Could not connect');});
           }
    }
})();
