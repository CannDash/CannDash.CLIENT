// (function() {
//   'use strict';
//
//   angular
//     .module('cannDash')
//     .factory('OrderHub', OrderHub);
//
//   OrderHub.$inject = ['$rootScope', 'Hub', '$timeout', 'toastr', 'backendServerUrl'];
//
//   /* @ngInject */
//   function OrderHub($rootScope, Hub, $timeout, toastr, backendServerUrl) {
//        var service = {
//
//        },
//
//       var hub = new Hub('orderHub', {
//         listeners: {
//           'orderCreated': options.orderCreated,
//           'orderUpdated': options.orderUpdated
//         },
//
//         methods: ['subscribe', 'unsubscribe'],
//
//         errorHandler: function(error) {
//           toastr.error(error);
//         },
//
//         rootPath: backendServerUrl,
//         logging: true,
//
//         stateChanged: function(state) {
//           switch (state.newState) {
//             case $.signalR.connectionState.connecting:
//               toastr.info('Connecting to the server..');
//               break;
//             case $.signalR.connectionState.connected:
//               toastr.success('Connected!');
//               break;
//             case $.signalR.connectionState.reconnecting:
//               toastr.info('Trying to reconnect to the server..');
//               break;
//             case $.signalR.connectionState.disconnected:
//               toastr.error('Disconnected from the server. Check your internet connection.');
//               break;
//           }
//         }
//       });
//
//       return hub;
//
//   }
// })();

(function() {
  'use strict';

  angular
    .module('cannDash')
    .factory('orderHub', orderHub);

  orderHub.$inject = ['$rootScope', 'Hub', '$timeout', 'toastr', 'backendServerUrl'];

  /* @ngInject */
  function orderHub($rootScope, Hub, $timeout, toastr, backendServerUrl) {

    var hub = new Hub('orderHub', {
      listeners: {
        'orderCreated': function(order) {
          toastr.success('Order created!');
        },
        'orderUpdated': function(order) {
          toastr.info('An order was updated');
        }
      },

      methods: ['subscribe', 'unsubscribe'],

      errorHandler: function(error) {
        toastr.error(error);
      },

      rootPath: backendServerUrl,
      logging: true,

      stateChanged: function(state) {
        switch (state.newState) {
          case $.signalR.connectionState.connecting:
            toastr.info('Connecting to the server..');
            break;
          case $.signalR.connectionState.connected:
            toastr.success('Connected!');
            break;
          case $.signalR.connectionState.reconnecting:
            toastr.info('Trying to reconnect to the server..');
            break;
          case $.signalR.connectionState.disconnected:
            toastr.error('Disconnected from the server. Check your internet connection.');
            break;
        }
      }
    });

    var service = {
      subscribe: subscribe,
      unsubscribe: unsubscribe
    };

    return service;

    ////////////////

    function subscribe(dispensaryId) {
      hub.subscribe(dispensaryId);
    }

    function unsubscribe(dispensaryId) {
      hub.unsubscribe(dispensaryId)
    }
  }
})();
