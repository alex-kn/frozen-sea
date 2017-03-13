/**
 * Created by Mathis on 13.03.2017.
 */
angular
    .module('ByRoleService', [])
    .factory('ByRoleService', ['Subuser', '$http', 'LoopBackAuth', function (Subuser, $http, LoopBackAuth) {

        function getUsersByRole(role) {
            return promise = $http.get('/api/Subusers/' + LoopBackAuth.currentUserId + '/byRole/' + role + "?access_token=" + LoopBackAuth.accessTokenId).then(function (response) {
                return response.data.users;
            });
        }

        return {
            getUsersByRole: getUsersByRole
        };


    }]);