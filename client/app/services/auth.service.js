angular
    .module('AuthService', [])
    .factory('AuthService', ['Subuser', '$rootScope','$window', function (User, $rootScope, $window) {
        //TODO: Error-Handling

        function logout() {
            return User.logout().$promise.then(function() {
                    $rootScope.currentUser = null;
                    $window.location.reload();
                });
        }


        /**
         * Persist $rootScope on Refresh
         *
         * @param   accessTokenId   Access token of logged in user (String)
         */

        /* User.getCurrent not working: 401 Error

        function refresh(accessTokenId) {
            return User.getCurrent(function (userResource) {
                $rootScope.currentUser = {};
                $rootScope.currentUser = {
                    id: userResource.id,
                    tokenId: accessTokenId
                };
            });
        }
        */
        return {
            logout: logout,
            //refresh: refresh
        };


    }]);
