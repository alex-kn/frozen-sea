'use strict';

angular.module('login', ['ngRoute'])
    .controller('LoginController', ['$rootScope', '$scope', 'Subuser', 'ToastService', '$location','$translate', '$filter','$routeParams', 'ByRoleService', 'LoopBackAuth',
        function($rootScope, $scope, Subuser, ToastService, $location, $translate, $filter, $routeParams, ByRoleService, LoopBackAuth) {
            //TODO: Error-Handling

            $scope.email="";
            $scope.password="";
            $scope.errorMessage = "";
            $rootScope.currentUser = {};
            $scope.showMore = false;

            $scope.toggleShowMore = function() {
                $scope.showMore = !$scope.showMore;
            };

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
                    console.log(err);
                    $scope.errorMessage = $filter('translate')('LOGIN.ERROR');
                });
            }
        }]);
