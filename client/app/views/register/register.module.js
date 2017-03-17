/**
 * Created by Jan on 21-Dec-16
 */

angular.module('register', ['ngRoute'])
    .controller('RegisterController', ['$scope', 'Subuser','ToastService','$filter', '$location', '$rootScope', '$translate',
        function ($scope, Subuser, ToastService,$filter, $location, $rootScope, $translate) {

            $scope.errorMessage = "";
            $scope.registerProgress = true;
            $scope.showMore = false;

            $scope.toggleShowMore = function() {
                $scope.showMore = !$scope.showMore;
            };

            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };


            /**
             * Create new user in data base
             *
             * @param firstName - contains the firstName of the new user (String)
             * @param secondName - contains the secondName of the new user (String)
             * @param email - contains the email, serves as username (String)
             * @param password - contains the password (Hash)
             */

            $scope.register = function (firstName, secondName, email, password) {
                $scope.registerProgress = false;

                return Subuser.create({
                    username: email,
                    email: email,
                    firstName: firstName,
                    secondName: secondName,
                    password: password
                }, function (value, responseHeaders) {
                    console.log('succ');
                    $scope.registerProgress = true;
                    ToastService.setToastText($filter('translate')('LOGIN.REGISTRATION_SUCCESS'));
                    ToastService.displayToast();
                    $location.path('/login');

                }, function (httpResponse) {
                    $scope.errorMessage = $filter('translate')('REGISTER.ERROR_EMAIL');
                    $scope.registerProgress = true;
                });
            };

        }]);