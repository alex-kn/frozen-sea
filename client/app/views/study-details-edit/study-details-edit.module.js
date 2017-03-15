/**
 * Created by Alex on 27.01.2017.
 */

'use strict';

angular.module('studyDetailsEdit', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/study-details-edit/', {
            templateUrl: 'views/study-details-edit/study-details-edit.template.html',
            controller: 'StudyDetailsEditController'
        });
    }])

    .controller('StudyDetailsEditController', ['$location', '$routeParams', '$scope', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study','StudyDate','ToastService','$filter',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study, StudyDate, ToastService, $filter) {


            $scope.study = Study
                .findById({id: $routeParams.study}, function (response) {
                    $scope.study.startDate = new Date($scope.study.startDate);
                    $scope.study.endDate = new Date($scope.study.endDate);
                    $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                    loadDates();
                    loadParticipations();
                });

            function loadDates() {
                $scope.dates = Study.dates({id: $scope.study.id}, function (response) {
                    //TODO sort dates
                    response.reverse();
                    return Promise.all(response.map(function (res) {
                        res.startDate = new Date(res.startDate);
                        res.endDate = new Date(res.endDate);
                        res.deadline = 24;
                        res.participants = 0;

                        $scope.participations.$promise.then(function () {
                            $scope.participations.forEach(function (participation) {
                                if (participation.studyDateId == res.id) {
                                    res.participants += 1;
                                }
                            });
                        });


                        return res;

                    }));
                });
            }

            function loadParticipations() {
                $scope.participations = Participation.find({
                    filter: {
                        where: {
                            studyId: $scope.study.id,
                            status: {neq: 'declined'}
                        }
                    }
                });
            }


            $scope.removeDate = function (date) {
                StudyDate.participations.count({id: date.id},function (response) {
                    if(response.count){
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.DELETE_DATE_FAILED'));
                        ToastService.displayToast();
                    }else{
                        StudyDate.deleteById({id: date.id},function (response) {
                            console.log(response);
                            var index = $scope.dates.indexOf(date);
                            if (index > -1) {
                                $scope.dates.splice(index, 1);
                            }

                        })
                    }
                });
            };

            $scope.saveDate = function(date){

                StudyDate.participations.count({id: date.id},function (response) {
                    if(response.count > date.maxParticipants){
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.MAX_PARTICIPANT_CHANGE_FAILED'));
                        ToastService.displayToast();
                    }else{
                        var tempParticipants = date.participants;
                        date.$save().then(function () {
                            console.log("Date saved.");
                            date.changed = false;
                            date.saved = true;
                            date.participants = tempParticipants;
                        });
                    }
                });


            };

            $scope.updateStudy = function () {

                $scope.study
                    .$save()
                    .then(function (res) {
                        console.log("changes saved");
                        $location.path('/study-details-view').search({'study': $scope.study.id});
                        //TODO notify participants
                    }).catch(function (req) {
                    console.log("error saving changes");
                });
            }

            $scope.discardChanges = function () {
                $location.path('/study-details-view').search({'study': $scope.study.id});
            }

            $scope.deleteStudy = function () {
                //TODO delete participations and studyDates aswell
                Study.deleteById({id: $scope.study.id}, function (response) {
                    console.log("Study deleted!");
                    $location.path('/home');
                });
            }

        }]);