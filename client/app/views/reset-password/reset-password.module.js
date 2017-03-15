angular.module('resetPassword', ['ngRoute'])
    .controller('ResetPasswordController', ['$scope', 'Subuser', '$filter','$location', 'ToastService','$rootScope', '$translate', '$routeParams', '$http',
        function ($scope, Subuser, $filter,$location, ToastService,$rootScope, $translate, $routeParams, $http) {
        $scope.errorMessage = "";
        $scope.resetProgress = true;


            $scope.resetPassword = function (passwordOne, passwordTwo) {
                $scope.resetProgress = false;
                if (passwordOne != passwordTwo) {
                    $scope.errorMessage = $filter('translate')('RESET_PASSWORD.NO_MATCH');
                }
                else {
                    $http.defaults.headers.common.authorization = $routeParams.token;

                    return Subuser.prototype$updateAttributes({id: $routeParams.id}, {
                        password: passwordOne
                    }, function () {
                        ToastService.setToastText($filter('translate')('RESET_PASSWORD.SUCCESS_RESET'));
                        ToastService.displayToast();
                        $location.path('/home');
                    }, function (httpResponse) {
                        console.log(httpResponse);
                        if(httpResponse.data.error.status == 401){
                            $scope.resetProgress = true;
                            $scope.errorMessage = $filter('translate')('RESET_PASSWORD.OLD_TOKEN');
                        }
                        else {
                            $scope.resetProgress = true;
                            $location.path('/home');
                        }
                    });
                }
            }

            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

        }]);