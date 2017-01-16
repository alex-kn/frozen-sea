/**
 * Created by Jan on 21-Dec-16
 */

angular.module('register', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'views/register/register.template.html',
            controller: 'RegisterController'
        });
    }])
    .controller('RegisterController', ['$scope', 'Subuser', '$location','$rootScope', function($scope, Subuser) {

        $scope.errorMessage = "";

        /**
         * Create new user in data base
         *
         * @param name - contains the full name of the new user (String)
         * @param email - contains the email, serves as username (String)
         * @param password - contains the password (Hash)
         */

        $scope.register = function(name, email, password) {
            return Subuser
                .create({
                    username: name,
                    email: email,
                    password: password
                })
                .$promise
                .then(function(response) {
                    console.log(response);
                });
        };

    }]);