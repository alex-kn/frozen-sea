/**
 * Created by Jan on 21-Dec-16
 */

angular.module('register', ['ngRoute'])
    .controller('RegisterController', ['$scope', 'Subuser','ToastService','$filter', '$location', '$rootScope', '$translate','EmailService',
        function ($scope, Subuser, ToastService,$filter, $location, $rootScope, $translate, EmailService) {

            $scope.errorMessage = "";
            $scope.registerProgress = true;

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

            $scope.register = function (firstname, secondname, email, password) {
                $scope.registerProgress = false;

                return Subuser.create({
                    username: email,
                    email: email,
                    firstName: firstname,
                    secondName: secondname,
                    password: password
                }, function (value, responseHeaders) {
                    console.log('succ');
                    $scope.registerProgress = true;
                    ToastService.setToastText($filter('translate')('LOGIN.REGISTRATION_SUCCESS'));
                    ToastService.displayToast();
                    $location.path('/login');

                }, function (httpResponse) {
                    if((httpResponse.data.error.message.includes("username") && httpResponse.data.error.message.includes("email") && httpResponse.data.error.status == 422)){
                        $scope.errorMessage = $filter('translate')('REGISTER.ERROR_EMAIL_USERNAME');
                    }
                    else if(httpResponse.data.error.message.includes("email") && httpResponse.data.error.status == 422){
                        $scope.errorMessage = $filter('translate')('REGISTER.ERROR_EMAIL');
                    }
                    else if(httpResponse.data.error.message.includes("username") && httpResponse.data.error.status == 422){
                        $scope.errorMessage = $filter('translate')('REGISTER.ERROR_USERNAME');
                    }
                    $scope.registerProgress = true;
                });
            };

        }]);