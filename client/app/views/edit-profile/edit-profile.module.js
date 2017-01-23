
'use strict';

angular.module('editProfile', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit-profile', {
            templateUrl: 'views/edit-profile/edit-profile.template.html',
            controller: 'editProfileController'
        });
    }])
    .controller('editProfileController', ['$scope', 'Subuser','$route', function ($scope, User, $route) {
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

        User.getCurrent(function(userData){
            console.log(userData);
            $scope.currentUserData.Username = userData.username;
            //$scope.currentUserData.Email = userData.email;
            //$scope.currentUserData.Name = userData.name;
            $scope.userId = userData.id;
        });

        $scope.toggleArrow = function (key) {
            $scope.toggleActive[key] = !$scope.toggleActive[key];
        };

        $scope.showPromptPassword = function(ev) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                controller: editProfileTest,
                parent: parentEl,
                targetEvent: ev,
                templateURL:'index.html'
            });

        };

        $scope.changeUsername = function(){
            User.prototype$updateAttributes({ id: $scope.userId }, {'username': $scope.input.name}, function(){
                $route.reload();
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
                    }, function (err) {
                        $scope.error = err.data.error.message;
                    })
                }
                $scope.error.oldPassword = '';
            }, function() {
                $scope.error.oldPassword = 'Altes Passwort stimmt nicht überein.';
            });

        };

    }]);
