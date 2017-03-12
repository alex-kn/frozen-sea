angular.module('resetPassword', ['ngRoute'])
    .controller('ResetPasswordController', ['$scope', 'Subuser', '$location', '$rootScope', '$translate', '$routeParams', '$http',
        function ($scope, Subuser, $location, $rootScope, $translate, $routeParams, $http) {
        //TODO: Error-Handling, verification pw fields, rename fields
        $scope.errorMessage = "";

            $scope.resetPassword = function (password) {
                $http.defaults.headers.common.authorization = $routeParams.token;

                return Subuser.prototype$updateAttributes({id: $routeParams.id}, {
                    password: password
                }, function () {
                    $location.path('/home');
                }, function(err){
                    console.log(err)
                    $location.path('/home');
                });
            }

            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

        }]);