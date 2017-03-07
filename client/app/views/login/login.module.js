'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/login/login.template.html',
            controller: 'LoginController'
        });
    }])
    .controller('LoginController', ['$scope', 'Subuser', '$location','$rootScope','$translate', '$filter',
        function($scope, Subuser, $location, $rootScope, $translate, $filter) {
            $scope.email="";
            $scope.password="";
            $scope.errorMessage = "";
            $rootScope.currentUser = {};

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
