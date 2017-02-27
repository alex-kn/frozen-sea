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

    .controller('StudyDetailsController', ['$location','$routeParams', '$scope', 'Subuser','Participation','LoopBackAuth', '$http', 'Study',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study) {

            //TODO if authorized to edit (Creator or Supervisor)
            $scope.canEdit = true;

            //TODO replace with Supervisors (Subusers)
            $scope.supervisors = [
                {id: 1, name: 'Horst'},
                {id: 2, name: 'Herbert'},
                {id: 3, name: 'Ivanka'}
            ];

            $scope.study = $routeParams.study;
            $scope.study.startDate = new Date($scope.study.startDate);
            $scope.study.endDate = new Date($scope.study.endDate);

            $scope.appointments = Study.dates({id: $scope.study.id});

            $scope.participate = function(date){
                //TODO add reward? and studyDate
                Participation.create({
                    participantId: LoopBackAuth.currentUserId,
                    studyId: $scope.study.id,
                    status: "pending",
                })
                    .$promise
                    .then(function (response){
                        $location.path('/home');
                        console.log(response);
                    });

            }

            //----------------------------------------
            //EDIT STUDY
            $scope.removeAppointment = function () {

            };

            $scope.updateStudy = function () {
                $scope.editing = false;
            }

            $scope.editStudy = function () {
                $scope.editing = true;
            }

        }]);