/**
 * Created by Alex on 27.01.2017.
 */

'use strict';

angular.module('studyDetailsView', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/study-details-view/', {
            templateUrl: 'views/study-details-view/study-details-view.template.html',
            controller: 'StudyDetailsViewController'
        });
    }])

    .controller('StudyDetailsViewController', ['$q', '$location', '$routeParams', '$scope', 'StudyDate', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study', '$filter', 'ToastService',
        function ($q, $location, $routeParams, $scope, StudyDate, Subuser, Participation, LoopBackAuth, $http, Study, $filter, ToastService) {

            $scope.isOwner = false;
            $scope.studyIsLoading = true;
            $scope.isParticipating = false;
            $scope.alreadyParticipated = false;

            $scope.study = Study.findById({id: $routeParams.study}, function (response) {
                $scope.study.startDate = new Date($scope.study.startDate);
                $scope.study.endDate = new Date($scope.study.endDate);
                $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                loadDates();
                groupDatesByDay();
            });

            function loadDates() {
                $scope.appointments = Study.dates({id: $scope.study.id}, function (responseDateArray) {
                    return $q.all(responseDateArray.map(function (responseDate) {

                        responseDate.startDate = new Date(responseDate.startDate);
                        responseDate.endDate = new Date(responseDate.startDate.getTime() + responseDate.duration * 60000);
                        responseDate.participants = 0;
                        if(isNaN(responseDate.deadline)){
                            throw new Error("You screwed up! Deadline has to be a number! Fix it!");//TODO
                        }
                        responseDate.deadlineDate = new Date(responseDate.startDate.getTime() - responseDate.deadline * 3600000);
                        if (responseDate.deadlineDate < new Date()) {
                            responseDate.status = "finished";
                        }
                        if ($scope.isOwner) {
                            responseDate.isLoading = true;
                            StudyDate.participations({id: responseDate.id}, function (responseParticipationArray) {

                                $q.all(responseParticipationArray.map(function (responseParticipation) {
                                    responseParticipation.name = $filter('translate')('STUDY_DETAILS.LOADING_PARTICIPANT');
                                    Participation.participant({id: responseParticipation.id}, function (r) {
                                        responseParticipation.name = (r.username);
                                    });
                                }));
                                responseDate.isLoading = false;

                                responseDate.participations = responseParticipationArray;
                                responseDate.participants = responseParticipationArray.length;

                                if (responseDate.participants >= responseDate.maxParticipants) {
                                    responseDate.status = "reserved";
                                }
                            })
                        } else {
                            StudyDate.participations.count({id: responseDate.id}, function (responseParticipationArray) {
                                responseDate.participants = responseParticipationArray.count;
                                if (responseDate.participants >= responseDate.maxParticipants) {
                                    responseDate.status = "reserved";
                                }
                            });
                            Participation.count({
                                    where: {
                                        participantId: LoopBackAuth.currentUserId,
                                        studyDateId: responseDate.id,
                                        studyId: $scope.study.id

                                }
                            }, function (response) {
                                if (response.count > 0) {
                                    responseDate.participating = true;
                                    if(responseDate.startDate < new Date()){
                                        $scope.alreadyParticipated = true;
                                    }
                                    $scope.isParticipating = true;
                                    $scope.datesGroupedByDay.forEach(function (d) {
                                        d.forEach(function (date) {
                                            if (date.participating) {
                                                d.show = true;
                                            }
                                        })
                                    })
                                }
                            });
                        }

                        $scope.studyIsLoading = false;
                        return responseDateArray;
                    }));
                })


            }


            function groupDatesByDay() {

                $scope.datesGroupedByDay = [];
                var days = [];
                var day;
                var lastDay;

                $scope.appointments.$promise.then(function (res) {

                    res.sort(function (a, b) {
                        return a.startDate - b.startDate;

                    });
                    $q.all(res.map(function (date) {
                        day = $filter('date')(date.startDate, "shortDate");
                        if (lastDay == undefined) {
                            lastDay = day;
                        }
                        if (day != lastDay) {
                            $scope.datesGroupedByDay.push(days);
                            days = [];
                            days.push(date);
                            lastDay = day;
                        } else {
                            days.push(date);
                        }
                    }));
                    $scope.datesGroupedByDay.push(days);
                    $scope.datesGroupedByDay[0].show = true;
                })
            }

            function mapReward(testThis, userChoice) {
                switch (testThis) {
                    case "reward_money":
                        if (userChoice == "reward_money") {
                            return $scope.study.reward.reward_money;
                        }
                        break;
                    case "reward_voucher":
                        if (userChoice == "reward_voucher") {
                            return $scope.study.reward.reward_voucher;
                        }
                        break;
                    case "reward_hours":
                        if (userChoice == "reward_hours") {
                            return $scope.study.reward.reward_hours;
                        }
                }
                return 0
            }


            $scope.participate = function (studyDate) {
                $scope.waitingForParticipation = true;

                ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATING'));
                ToastService.displayToast();

                Participation.count({
                    where: {
                        participantId: LoopBackAuth.currentUserId,
                        studyId: $scope.study.id
                    }
                }, function (response) {
                    if(response.count > 0){
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATION_FAILED'));
                        ToastService.displayToast();
                        $scope.waitingForParticipation = false;
                    }else{
                        Subuser.participations.create({
                            id: LoopBackAuth.currentUserId
                        }, {
                            status: "pending",
                            reward_money: mapReward("reward_money", $scope.chosenReward),
                            reward_voucher: mapReward("reward_voucher", $scope.chosenReward),
                            reward_hours: mapReward("reward_hours", $scope.chosenReward),
                            studyId: $scope.study.id,
                            studyDateId: studyDate.id
                        }, function (response) {
                            ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATION_SUCCESSFUL'));
                            ToastService.displayToast();
                            studyDate.participating = true;
                            studyDate.participants += 1;
                            $scope.isParticipating = true;
                            console.log("Participation created.");
                            $scope.waitingForParticipation = false;
                        }, function (error) {
                            console.log("Participation could not be created.");
                            console.log(error);
                            $scope.waitingForParticipation = false;
                        });
                    }
                });


            };

            $scope.withdrawParticipation = function (studyDate) {
                $scope.waitingForParticipation = true;

                ToastService.setToastText($filter('translate')('STUDY_DETAILS.WITHDRAWING_PARTICIPATION'));
                ToastService.displayToast();

                Participation.find({
                    filter: {
                        where: {
                            participantId: LoopBackAuth.currentUserId,
                            studyId: $scope.study.id,
                            studyDateId: studyDate.id
                        }
                    }
                }, function (response) {
                    console.log(response);
                    Subuser.participations.destroyAll(
                        {id: LoopBackAuth.currentUserId},
                        {filter: {where: {studyDateId: studyDate.id}}}, function (response) {
                            ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATION_WITHDRAWN'));
                            ToastService.displayToast();
                            studyDate.participating = false;
                            studyDate.participants -= 1;
                            $scope.isParticipating = false;
                            $scope.waitingForParticipation = false;
                        }, function (error) {
                            console.log("Error deleting Participation");
                            console.log(error);
                            $scope.waitingForParticipation = false;
                        });

                });
            };

            $scope.declineParticipation = function (participation) {
                Participation.deleteById({id: participation.id});
                participation.status = "declined";
            };

            $scope.updateParticipationStatus = function (participation, status){
                participation.status = status;
                var name = participation.name;
                participation.$save().then(function () {
                    participation.name = name;
                    if(status == 'completed'){
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.COMPLETED'));
                        ToastService.displayToast();
                    }
                });
            };

            $scope.editStudy = function () {
                $location.path('/study-details-edit').search({'study': $scope.study.id});
            };

            $scope.toggleDay = function (day) {
                day.show = !day.show;
            }

        }]);