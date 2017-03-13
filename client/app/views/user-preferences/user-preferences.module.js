/**
 * Created by Alex on 09.01.2017.
 */

'use strict';

angular.module('userPreferences', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user-preferences/', {
            templateUrl: 'views/user-preferences/user-preferences.template.html',
            controller: 'UserPreferencesController'
        });
    }])

    .controller('UserPreferencesController', ['$filter','$location','LoopBackAuth', '$scope', 'Preference', 'Subuser', 'User', '$rootScope', '$http','ToastService',
        function ($filter, $location, LoopBackAuth, $scope, Preference, Subuser, User, $rootScope, $http, ToastService) {
        var self = this;

        $http.get('resc/files/studyprograms.txt')
            .then(function (response) {
                    $scope.studyPrograms = response.data.split("\n");
                }
            );

        Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
            $scope.preferences = response;
            $scope.preferences.birthDate = new Date($scope.preferences.birthDate);
            self.selectedItem = $scope.preferences.course;

        });

        $scope.savePreferences = function () {
            $scope.preferences.course = self.selectedItem;
            if(!$scope.preferences.student){
                $scope.preferences.course = null;
                $scope.preferences.matriculationNr = null;
            }
            $scope.preferences.$save().then(function (response) {
                ToastService.setToastText($filter('translate')('USER_PREFERENCES.SAVING_SUCCESSFUL'));
                ToastService.displayToast();
            },function (error) {
                console.warn("saving preferences failed")
            });
        };

        $scope.maxDate = new Date("January 1, 2010 00:00:00");
        $scope.minDate = new Date("January 1, 1900 00:00:00");


        $scope.getMatches = function (text) {
            text = angular.lowercase(text);
            var ret = $scope.studyPrograms.filter(function (d) {
                return angular.lowercase(d).startsWith(text);
            });
            return ret;
        }
    }]);