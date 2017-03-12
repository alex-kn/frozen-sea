'use strict';

angular.module('login', ['ngRoute'])
    .controller('LoginController', ['$scope', 'Subuser', 'ToastService', '$location','$rootScope','$translate', '$filter','$routeParams',
        function($scope, Subuser, ToastService, $location, $rootScope, $translate, $filter, $routeParams) {
            //TODO: Error-Handling

            $scope.email="";
            $scope.password="";
            $scope.errorMessage = "";
            $rootScope.currentUser = {};

            if($routeParams.param1 == 'registered') {
                ToastService.setToastText($filter('translate')('LOGIN.REGISTRATION_SUCCESS'));
                ToastService.displayToast();
            }
            if($routeParams.param1 == 'verified') {
                ToastService.setToastText($filter('translate')('LOGIN.VERIFICATION_SUCCESS'));
                ToastService.displayToast();
            }

            $scope.changeLanguage = function(langKey) {
                $translate.use(langKey);
            };

            $scope.loginUser = function(email, password) {


                //TODO change username to email
                Subuser.login({username: email, password: password}, function(response, header) {
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id
                    };
                    $location.path('/home');
                }, function(err) {
                    $scope.errorMessage = $filter('translate')('LOGIN.ERROR');
                });
            }
        }]);
