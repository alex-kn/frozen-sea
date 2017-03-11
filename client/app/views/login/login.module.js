'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login/:param1', {
            templateUrl: 'views/login/login.template.html',
            controller: 'LoginController'
        }).when('/login', {
            templateUrl: 'views/login/login.template.html',
            controller: 'LoginController'
        });
    }])
    .controller('LoginController', ['$scope', 'Subuser', '$location','$rootScope','$translate', '$filter','$routeParams','ToastService',
        function($scope, Subuser, $location, $rootScope, $translate, $filter, $routeParams, ToastService) {
            $scope.email="";
            $scope.password="";
            $scope.errorMessage = "";
            $rootScope.currentUser = {};

            if($routeParams.param1 == 'registered') {
                ToastService.setToastText('Registration erfolgreich! Um sich einloggen zu können, klicken sie bitte auf den Bestätigungslink in Ihrem Email-Postfach.');
                ToastService.displayToast();
            }
            if($routeParams.param1 == 'verified') {
                ToastService.setToastText('Email-Verifikation erfolgreich! Sie können sich jetzt einloggen.');
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
