/**
 * Created by Alex on 27.01.2017.
 */

'use strict';

angular.module('studyDetails', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/study-details/', {
            templateUrl: 'views/study-details/study-details.template.html',
            controller: 'StudyDetailsController'
        });
    }])

    .controller('StudyDetailsController', ['$routeParams', '$scope', 'Subuser', '$http','Study',
        function ($routeParams, $scope, Subuser, $http, Study) {


        $scope.study = $routeParams.study;

    }])