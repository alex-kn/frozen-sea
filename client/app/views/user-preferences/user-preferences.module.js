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

    .controller('UserPreferencesController', ['$scope', 'Preference','Subuser','User','$rootScope', function ($scope, Preference, Subuser, User, $rootScope) {
        $scope.title = 'Meine Kriterien';

        $scope.preferences = {
            operatingSystem: {
                ios: false,
                android: false
            }
        }

        //console.log($rootScope.currentUser.id);
        //console.log(Subuser.findById({_id: $rootScope.currentUser.id}));


        /*$scope.preferences = {
            operatingSystem: {
                ios: false,
                android: false,
                other: false,
            },
            visualAid: {
                glasses: false,
                contactLenses: false,
                none: false,

            },
            handedness: {
                leftHanded: false,
                rightHanded: false
            },
            language: {
                german: false,
                english: false,
            },
            height: null,

        }*/

        $scope.savePreferences = function() {

        }

        }])