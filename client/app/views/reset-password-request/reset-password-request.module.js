angular.module('resetPasswordRequest', ['ngRoute'])
    .controller('ResetPasswordRequestController', ['$scope', 'Subuser', 'ToastService','$filter', '$location', '$rootScope', '$translate',
        function ($scope, Subuser, ToastService,$filter, $location, $rootScope, $translate) {
            $scope.resetProgress = true;
            $scope.errorMessage = "";


            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

            $scope.resetPassword = function (email) {
                $scope.resetProgress = false;

                Subuser.resetPassword({email: email},
                    function (response, responseHeaders) {
                        console.log('succ');
                        $scope.resetProgress = true;
                        console.log(response);
                        ToastService.setToastText($filter('translate')('RESET_PASSWORD.SUCCESS_EMAIL'));
                        ToastService.displayToast();
                        $location.path('/login');
                    }, function (httpResponse) {
                        $scope.resetProgress = true;
                        //Object { data: Object, status: 404, headers: headersGetter/<(), config: Object, statusText: "Not Found" }
                        $scope.errorMessage = $filter('translate')('RESET_PASSWORD.NO_EMAIL');
                    });
            }
        }]);