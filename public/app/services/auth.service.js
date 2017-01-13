angular
    .module('AuthService', [])
    .factory('AuthService', ['Subuser', '$rootScope', '$location', function (User, $rootScope, $location) {
        //TODO: Error-Handling

        function logout() {
            console.log('logout');
            User.logout();
            $rootScope.currentUser = null;
            $location.path('/');
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
