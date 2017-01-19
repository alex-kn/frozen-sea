/**
 * Created by jan on 15.12.16.
 */

'use strict';

angular.module('home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.template.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', ['$scope', 'Subuser', 'Study', 'LoopBackAuth', 'studyFilter',
        function($scope, Subuser, Study, LoopBackAuth, studyFilter) {

        $scope.studies = Study.find(
            function(list) { /* success */ },
            function(errorResponse) { /* error */ }
        );


        Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
            $scope.preferences = response;

            //studyFilter($scope.studies, $scope.preferences)
        });

        $scope.savePreferences = function () {
            $scope.preferences.$save();
        }

    }]);
