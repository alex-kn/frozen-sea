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

    .controller('UserPreferencesController', ['LoopBackAuth', '$scope', 'Preference', 'Subuser', 'User', '$rootScope', function (LoopBackAuth, $scope, Preference, Subuser, User, $rootScope) {
        $scope.title = 'Meine Kriterien';



        Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
            $scope.preferences = response;
        },function (error){
            if(error.status == 404){
                Subuser.preferences
                    .create({id: LoopBackAuth.currentUserId}, {})
                    .$promise
                    .then(function (response) {
                        $scope.preferences = response;
                    });

            }
        });

        $scope.savePreferences = function () {
            $scope.preferences.$save();
        }

        $scope.studyPrograms = ['Milchsauferei', 'Bundeskanzlerei', 'Bierbrauerwesen']

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