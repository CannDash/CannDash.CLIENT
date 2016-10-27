(function () {

  'use strict';

  angular
    .module('cannDash')
    .service('authService', authService);

  authService.$inject = ['angularAuth0', 'authManager', '$location', '$http', '$q'];

  function authService(angularAuth0, authManager, $location, $http, $q) {

    function login(username, password, callback) {
      angularAuth0.login({
        connection: AUTHO_CONNECTION,
        responseType: 'token',
        email: username,
        password: password,
      }, callback);
    }

    // function signup(dispensary, callback) {
    //   angularAuth0.signup(dispensary, callback);
    // }

    function signup(data, callback) {
         var defer = $q.defer();
         $http.post('https://' + AUTH0_DOMAIN + '/dbconnections/signup', data);

         return defer.promise;
    }

    function reset(data, callback) {
         var defer = $q.defer();
         $http.post('https://' + AUTH0_DOMAIN + '/dbconnections/change_password', data);

         return defer.promise;
    }

    function googleLogin(callback) {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token'
      }, callback);
    }


    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        localStorage.setItem('id_token', result.idToken);
        authManager.authenticate();
        angularAuth0.getProfile(result.idToken, function (error, profileData) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profileData));
          $location.path('/');
        });
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
    }

    return {
      login: login,
      logout: logout,
      authenticateAndGetProfile: authenticateAndGetProfile,
      reset: reset,
      signup: signup,
      googleLogin: googleLogin
    }
  }
})();
