
'use strict';

angular.module('editProfile', ['ngRoute', 'ngMaterial'])
    .controller('editProfileController', ['$scope', 'Subuser','$route', '$mdToast', function ($scope, User, $route, $mdToast) {
        $scope.title = 'Profil bearbeiten';
        $scope.input = {};
        $scope.error = {};
        $scope.toggleActive = {
            Username: false,
            Passwort: false
        };
        $scope.currentUserData = {
            Username:'',
            //Email:'',
            //Name:'',
            Passwort:''
        };
        $scope.userId = '';

        /**
         * Get Current userdata and save to $scope.currentUserData
         */
        User.getCurrent(function(userData){
            $scope.currentUserData.Username = userData.username;
            //$scope.currentUserData.Email = userData.email;
            //$scope.currentUserData.Name = userData.name;
            $scope.userId = userData.id;
        });

        /**
         * Toggle arrow for dropdown
         * @param key Key of $scope.currentUserData
         */
        $scope.toggleArrow = function (key) {
            $scope.toggleActive[key] = !$scope.toggleActive[key];
        };

        $scope.changeUsername = function(){
            User.prototype$updateAttributes({ id: $scope.userId }, {'username': $scope.input.name}, function(){
                $route.reload();
                showToast('Username erfolgreich geändert!', 'success');
            },function(err) {
                if (err.data.error.status == 422) {
                    $scope.error.username ='Username existiert bereits.';
                } else {
                    $scope.error.username = err.data.error.message;
                }
            })
        };

        $scope.changePassword = function() {
            var comparePassword = $scope.input.newPassword == $scope.input.repeatNewPassword;

            if(!comparePassword){
                $scope.error.newPassword = 'Neues Passwort stimmt nicht überein.';
            } else {
                $scope.error.newPassword = '';
            }

            User.login({username: $scope.currentUserData.Username, password: $scope.input.oldPassword}, function(){
                if (comparePassword) {
                    User.prototype$updateAttributes({id: $scope.userId}, {'password': $scope.input.newPassword}, function () {
                        $route.reload();
                        showToast('Passwort erfolgreich geändert!', 'success');
                    }, function (err) {
                        $scope.error = err.data.error.message;
                    })
                }
                $scope.error.oldPassword = '';
            }, function() {
                $scope.error.oldPassword = 'Altes Passwort stimmt nicht überein.';
            });

        };

        /**
         * Show toast
         * @param content Text oft the toast
         * @param type Type of the toast 'error' or 'success'
         */
        function showToast(content, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(content)
                    .position('top right')
                    .hideDelay(3000)
                    .toastClass(type)
            );
        }
    }]);
