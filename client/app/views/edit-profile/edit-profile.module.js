
'use strict';

angular.module('editProfile', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit-profile', {
            templateUrl: 'views/edit-profile/edit-profile.template.html',
            controller: 'editProfileController'
        });
    }])
    .controller('editProfileController', ['$scope', 'Subuser','$mdDialog','$window', function ($scope, User, $mdDialog, $window) {
        $scope.title = 'Profil bearbeiten';
        $scope.currentUserData = {
            username:'',
            //email:'',
            name:'',
            password:''
        };

        $scope.userId = '';
        User.getCurrent(function(userData){
            console.log(userData);
            $scope.currentUserData.username = userData.username;
            //$scope.currentUserData.email = userData.email;
            $scope.currentUserData.name = userData.name;
            $scope.userId = userData.id;
        });

        $scope.showPrompt = function(ev, key){
            if (key == 'password'){
                $scope.showPromptPassword();
            }
            if (key == 'username'){
                $scope.showPromptUsername();
            }
            if (key == 'email'){
                $scope.showPromptEmail();
            }
            if (key == 'name'){
                $scope.showPromptName();
            }
        };

        $scope.showPromptPassword = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Passwort ändern')
                .placeholder('Neues Passwort')
                .ariaLabel('Password')
                .targetEvent(ev)
                .ok('Ändern')
                .cancel('Abbrechen');

            $mdDialog.show(confirm).then(function(result) {
                User.prototype$updateAttributes({ id: $scope.userId }, {'password':result})
                    .$promise.then(function (){
                    $window.location.reload();
                });
            }, function() {
                // Abbrechen
            });
        };

        $scope.showPromptUsername = function(ev, test) {
            var confirm = $mdDialog.prompt()
                .title('Username ändern')
                .placeholder($scope.currentUserData.username)
                .ariaLabel('username')
                .initialValue($scope.currentUserData.username)
                .targetEvent(ev)
                .ok('Ändern')
                .cancel('Abbrechen');

            $mdDialog.show(confirm).then(function(result) {
                User.prototype$updateAttributes({ id: $scope.userId }, {'username':result})
                    .$promise.then(function (){
                    $window.location.reload();
                });
            }, function() {
                // Abbrechen
            });
        };

        $scope.showPromptEmail = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Email ändern')
                .placeholder($scope.currentUserData.email)
                .ariaLabel('email')
                .initialValue($scope.currentUserData.email)
                .targetEvent(ev)
                .ok('Ändern')
                .cancel('Abbrechen');

            $mdDialog.show(confirm).then(function(result) {
                User.prototype$updateAttributes({ id: $scope.userId }, {'email':result})
                    .$promise.then(function (){
                    $window.location.reload();
                });
            }, function() {
                // Abbrechen
            });
        };

        $scope.showPromptName = function(ev, test) {
            var confirm = $mdDialog.prompt()
                .title('Namen ändern')
                .placeholder($scope.currentUserData.name)
                .ariaLabel('name')
                .initialValue($scope.currentUserData.name)
                .targetEvent(ev)
                .ok('Ändern')
                .cancel('Abbrechen');

            $mdDialog.show(confirm).then(function(result) {
                User.prototype$updateAttributes({ id: $scope.userId }, {'name':result})
                    .$promise.then(function (){
                        $window.location.reload();
                     });
            }, function() {
                // Abbrechen
            });
        };
    }]);