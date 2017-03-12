angular.module('resetPasswordRequest', ['ngRoute'])
    .controller('ResetPasswordRequestController', ['$scope', 'Subuser', '$location', '$rootScope', '$translate', 'EmailService',
        function ($scope, Subuser, $location, $rootScope, $translate, EmailService) {
            //TODO: Error-Handling

            $scope.errorMessage = "";


            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

            $scope.resetPassword = function (email) {
                Subuser.resetPassword({email: email},
                    function (response, responseHeaders) {
                        console.log('succ');
                        console.log(response);
                        $location.path('/login');
                    }, function (err) {
                        //Object { data: Object, status: 404, headers: headersGetter/<(), config: Object, statusText: "Not Found" }
                        console.log('err');
                        console.log(err);
                    });
            }
        }]);