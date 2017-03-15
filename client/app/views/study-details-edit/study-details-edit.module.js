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

    .controller('StudyDetailsEditController', ['$location', '$routeParams', '$scope', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study', 'StudyDate', 'ToastService', '$filter',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study, StudyDate, ToastService, $filter) {

            $scope.today = new Date();

            $scope.study = Study
                .findById({id: $routeParams.study}, function (response) {
                    $scope.study.startDate = new Date($scope.study.startDate);
                    $scope.study.endDate = new Date($scope.study.endDate);
                    $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                    loadDates();
                    loadParticipations();
                    initNewDate();
                });

            function initNewDate() {
                $scope.newDate = {
                    startDate: new Date(),
                    hours: 8,
                    minutes: 30,
                    duration: $scope.study.duration,
                    deadline: 0,
                    location: $scope.study.locations_array[0],
                    maxParticipants: 1
                };
            }

            function loadDates() {
                $scope.dates = Study.dates({id: $scope.study.id}, function (response) {
                    //TODO sort dates

                    return Promise.all(response.map(function (res) {
                        res.startDate = new Date(res.startDate);
                        res.participants = 0;
                        $scope.participations.$promise.then(function () {
                            $scope.participations.forEach(function (participation) {
                                if (participation.studyDateId == res.id) {
                                    res.participants += 1;
                                }
                            });
                        }).then(function () {
                            response.sort(function (a, b) {
                                return a.startDate - b.startDate;
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

            $scope.addDate = function () {
                $scope.newDate.startDate.setHours($scope.newDate.hours);
                $scope.newDate.startDate.setMinutes($scope.newDate.minutes);
                StudyDate
                    .create({
                    studyId: $scope.study.id,
                    ownerId: LoopBackAuth.currentUserId,
                    status: 'available',
                    startDate: $scope.newDate.startDate,
                    duration: $scope.newDate.duration,
                    location: $scope.newDate.location,
                    maxParticipants: $scope.newDate.maxParticipants,
                    deadline: $scope.newDate.deadline,
                    minParticipants: 0
                })
                    .$promise
                    .then(function (response) {
                        console.log(response);
                        response.new = true;
                        response.startDate = new Date(response.startDate);
                        response.participants = 0;
                        $scope.dates.push(response);
                        $scope.dates.sort(function (a, b) {
                            return a.startDate - b.startDate;
                        });
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.ADD_DATE_SUCCESSFUL'));
                        ToastService.displayToast();
                    })
            };

            $scope.removeDate = function (date) {
                StudyDate.participations.count({id: date.id}, function (response) {
                    if (response.count) {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.DELETE_DATE_FAILED'));
                        ToastService.displayToast();
                    } else {
                        StudyDate.deleteById({id: date.id}, function (response) {
                            var index = $scope.dates.indexOf(date);
                            if (index > -1) {
                                $scope.dates.splice(index, 1);
                            }
                            ToastService.setToastText($filter('translate')('STUDY_DETAILS.DELETE_DATE_SUCCESSFUL'));
                            ToastService.displayToast();
                        })
                    }
                });
            };

            $scope.saveDate = function (date) {

                StudyDate.participations.count({id: date.id}, function (response) {
                    if (response.count > date.maxParticipants) {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.MAX_PARTICIPANT_CHANGE_FAILED'));
                        ToastService.displayToast();
                    } else {
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