angular.module('resetPasswordRequest', ['ngRoute'])
    .controller('ResetPasswordRequestController', ['$scope', 'Subuser', 'ToastService','$filter', '$location', '$rootScope', '$translate',
        function ($scope, Subuser, ToastService,$filter, $location, $rootScope, $translate) {

            $scope.errorMessage = "";


            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

            $scope.resetPassword = function (email) {
                Subuser.resetPassword({email: email},
                    function (response, responseHeaders) {
                        console.log('succ');
                        console.log(response);
                        ToastService.setToastText($filter('translate')('LOGIN.VERIFICATION_SUCCESS'));
                        ToastService.displayToast();
                        $location.path('/login');
                    }, function (httpResponse) {
                        //Object { data: Object, status: 404, headers: headersGetter/<(), config: Object, statusText: "Not Found" }
                        $scope.errorMessage = $filter('translate')('RESET_PASSWORD.NO_EMAIL');
                    });
            }
        }]);