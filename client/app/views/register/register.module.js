/**
 * Created by Jan on 21-Dec-16
 */

angular.module('register', ['ngRoute'])
    .controller('RegisterController', ['$scope', 'Subuser', '$location', '$rootScope', '$translate','EmailService',
        function ($scope, Subuser, $location, $rootScope, $translate, EmailService) {
            //TODO: Error-Handling

            $scope.errorMessage = "";


            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };


            /**
             * Create new user in data base
             *
             * @param name - contains the full name of the new user (String)
             * @param email - contains the email, serves as username (String)
             * @param password - contains the password (Hash)
             */

            $scope.register = function (name, email, password) {
                return Subuser.create({
                    username: name,
                    email: email,
                    password: password
                }, function (value, responseHeaders) {
                    console.log('succ');
                    $location.path('/login/' +'registered');
                }, function (httpResponse) {
                    console.log('err');
                    console.log(httpResponse);

                });
            };

        }]);