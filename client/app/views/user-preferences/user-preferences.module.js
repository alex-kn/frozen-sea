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

    .controller('UserPreferencesController', ['LoopBackAuth', '$scope', 'Preference', 'Subuser', 'User', '$rootScope', '$http', function (LoopBackAuth, $scope, Preference, Subuser, User, $rootScope, $http) {
        var self = this;

        $scope.title = 'Meine Kriterien';

        $http.get('resc/files/studyprograms.txt')
            .then(function (response) {
                    console.log(response.data.split("\n"))
                    $scope.studyPrograms = response.data.split("\n");
                }
            );

        Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
            $scope.preferences = response;
            $scope.preferences.birthDate = new Date($scope.preferences.birthDate);
            self.selectedItem = $scope.preferences.studyProgram;
            console.log("selectedItem: " + self.selectedItem);

        });

        $scope.savePreferences = function () {
            $scope.preferences.studyProgram = self.selectedItem;
            $scope.preferences.$save();
        }

        $scope.maxDate = new Date("January 1, 2010 00:00:00");
        $scope.minDate = new Date("January 1, 1900 00:00:00");


        $scope.getMatches = function (text) {
            text = angular.lowercase(text);
            var ret = $scope.studyPrograms.filter(function (d) {
                return angular.lowercase(d).startsWith(text);
            });
            return ret;
        }
    }])