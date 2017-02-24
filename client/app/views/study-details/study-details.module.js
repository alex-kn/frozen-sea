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

    .controller('StudyDetailsController', ['$routeParams', '$scope', 'Subuser', '$http', 'Study',
        function ($routeParams, $scope, Subuser, $http, Study) {

            //TODO if authorized to edit (Creator or Supervisor)
            $scope.editing = false;

            //TODO replace with Supervisors (Subusers)
            $scope.supervisors = [
                {id: 1, name: 'Horst'},
                {id: 2, name: 'Herbert'},
                {id: 3, name: 'Ivanka'}
            ];

            $scope.study = $routeParams.study;
            $scope.study.startDate = new Date($scope.study.startDate);
            $scope.study.endDate = new Date($scope.study.endDate);

            $scope.removeAppointment = function () {

            };


            $scope.dates = Study.dates({id: $scope.study.id});

            $scope.updateStudy = function () {
                $scope.editing = false;
            }

            $scope.editStudy = function () {
                $scope.editing = true;
            }

        }]);