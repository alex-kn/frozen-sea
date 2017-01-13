'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/login/login.template.html',
            controller: 'LoginController'
        });
    }])
    .controller('LoginController', ['$scope', 'Subuser', '$location','$rootScope', function($scope, Subuser, $location, $rootScope) {
        $scope.email="";
        $scope.password="";
        $scope.errorMessage = "";
        $rootScope.currentUser = {};

        $scope.loginUser = function(email, password) {
            Subuser.login({username: email, password: password}, function(response, header) {
                $rootScope.currentUser = {
                    id: response.user.id,
                    tokenId: response.id
                };
                $location.path('/home');
            }, function(err) {
                $scope.errorMessage = "Ihre Anmeldedaten sind falsch!";
            });
        }
    }]);
