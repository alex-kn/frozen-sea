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

    .controller('UserPreferencesController', ['$scope', 'Preference', 'Subuser', 'User', '$rootScope', function ($scope, Preference, Subuser, User, $rootScope) {
        $scope.title = 'Meine Kriterien';

        //Subuser.preferences.create({id: $rootScope.currentUser.id}, {});

        Subuser.preferences({"id": $rootScope.currentUser.id}, function (response) {
            $scope.preferences = response;
        });

        $scope.savePreferences = function () {
            $scope.preferences.$save();
        }

    }])