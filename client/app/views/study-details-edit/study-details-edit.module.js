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

    .controller('StudyDetailsEditController', ['$location', '$routeParams', '$scope', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study', 'StudyDate', 'ToastService','AppointmentService', '$filter', '$mdDialog',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study, StudyDate, ToastService, AppointmentService, $filter, $mdDialog) {

            $scope.today = new Date();

            $scope.study = Study
                .findById({id: $routeParams.study}, function (response) {
                    $scope.study.startDate = new Date($scope.study.startDate);
                    $scope.study.endDate = new Date($scope.study.endDate);
                    $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                    loadDates();
                    loadParticipations();
                    loadParticipantCount();
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

            /**
             * @description
             *
             * Load the StudyDates and sort them according to date
             */
            function loadDates() {
                $scope.dates = Study.dates({id: $scope.study.id}, function (response) {
                    $scope.datesAreReady = true;
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

            function loadParticipantCount() {
                Study.participations.count({id: $scope.study.id}, function (response) {
                    $scope.totalParticipants = response.count;
                })
            }

            /**
             * @description
             *
             * Sort the StudyDates and update startDate and endDate of the
             * Study according to the dates of the StudyDates
             */
            function sortDatesAndUpdateStudy() {
                $scope.dates.sort(function (a, b) {
                    return a.startDate - b.startDate;
                });
                $scope.study.startDate = $scope.dates[0].startDate;
                $scope.study.endDate = $scope.dates[$scope.dates.length-1].startDate;
                $scope.study.$save();
            }

            /**
             * @description
             *
             * Add a new studyDate to the Study
             */
            $scope.addDate = function () {
                $scope.newDate.adding = true;
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
                        response.new = true;
                        response.startDate = new Date(response.startDate);
                        response.participants = 0;
                        $scope.dates.push(response);
                        $scope.dates.$promise.then(function () {
                            sortDatesAndUpdateStudy();
                        });
                        $scope.newDate.adding = false;
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.ADD_DATE_SUCCESSFUL'));
                        ToastService.displayToast();
                    })
            };

            /**
             * @description
             *
             * Remove a specific StudyDate, if it has no participants
             *
             * @param date The date to remove
             */
            $scope.removeDate = function (date) {
                date.deleting = true;
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
                            sortDatesAndUpdateStudy();
                            ToastService.setToastText($filter('translate')('STUDY_DETAILS.DELETE_DATE_SUCCESSFUL'));
                            ToastService.displayToast();
                        })
                    }
                });
            };

            /**
             * @description
             *
             * Save changes made to a specific date
             *
             * @param date
             */
            $scope.saveDate = function (date) {
                date.saving = true;
                StudyDate.participations.count({id: date.id}, function (response) {
                    if (response.count > date.maxParticipants) {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.MAX_PARTICIPANT_CHANGE_FAILED'));
                        ToastService.displayToast();
                        date.saving = false;
                    } else {
                        var tempParticipants = date.participants;
                        date.$save().then(function () {
                            console.log("Date saved.");
                            date.changed = false;
                            date.saved = true;
                            date.saving = false;
                            date.participants = tempParticipants;
                        });
                    }
                });


            };

            $scope.updateStudy = function () {
                $scope.study.$save();
            };

            $scope.back = function () {
                $location.path('/study-details-view').search({'study': $scope.study.id});
            };

            /**
             * @description
             *
             * Delete the Study. This is only possible, if the study has no Participations
             *
             * @param ev
             */
            $scope.deleteStudy = function (ev) {
                loadParticipantCount();
                if ($scope.totalParticipants) {
                    ToastService.setToastText($filter('translate')('STUDY_DETAILS.STUDY_DELETION_FAILED'));
                    ToastService.displayToast();
                    return;
                }

                var confirm = $mdDialog.confirm()
                    .title($filter('translate')('STUDY_DETAILS.ARE_YOU_SURE'))
                    .textContent($filter('translate')('STUDY_DETAILS.DELETE_STUDY_CONFIRMATION'))
                    .ariaLabel($filter('translate')('STUDY_DETAILS.ARE_YOU_SURE'))
                    .targetEvent(ev)
                    .ok($filter('translate')('STUDY_DETAILS.YES'))
                    .cancel($filter('translate')('STUDY_DETAILS.NO'));

                $mdDialog.show(confirm).then(function () {
                    Study.dates.destroyAll({id: $scope.study.id});
                    Study.deleteById({id: $scope.study.id}, function (response) {
                        console.log("Study deleted!");
                        $location.path('/home');
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.STUDY_DELETED'));
                        ToastService.displayToast();
                    });
                }, function () {

                });
            };

        }]);