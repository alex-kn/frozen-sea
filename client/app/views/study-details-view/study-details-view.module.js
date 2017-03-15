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

    .controller('StudyDetailsViewController', ['$mdDialog', '$q', '$location', '$routeParams', '$scope', 'StudyDate','Preference', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study', '$filter', 'ToastService', 'EmailService',
        function ($mdDialog, $q, $location, $routeParams, $scope, StudyDate,Preference, Subuser, Participation, LoopBackAuth, $http, Study, $filter, ToastService, EmailService) {

            $scope.isOwner = false;
            $scope.studyIsLoading = true;
            $scope.isParticipating = false;
            $scope.alreadyParticipated = false;
            $scope.totalParticipants = 0;
            $scope.participantUserIds = [];

            $scope.femaleParticipants = 0;
            $scope.maleParticipants = 0;

            $scope.flexGtXs = 45;
            $scope.flexGtMd = 30;
            $scope.flexGtLg = 30;


            $scope.study = Study.findById({id: $routeParams.study}, function (response) {
                $scope.study.startDate = new Date($scope.study.startDate);
                $scope.study.endDate = new Date($scope.study.endDate);
                $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                if ($scope.isOwner) {
                    $scope.flexGtXs = 100;
                    $scope.flexGtMd = 100;
                    $scope.flexGtLg = 45;
                }
                Study.owner({id: $scope.study.id}, function (res) {
                    $scope.owner = res.firstName + " " + res.secondName;
                    $scope.ownerReady = true;
                });

                loadParticipations();
                loadDates();
                groupDatesByDay();
                calculateRequirements();
            });

            Subuser
                .preferences({id: LoopBackAuth.currentUserId})
                .$promise
                .then(function (response) {
                    $scope.isStudent = response.matriculationNr > 0;
                });

            $scope.study.$promise.then(function () {
                $scope.studyIsReady = true;
            });

            function loadDates() {
                $scope.appointments = Study.dates({id: $scope.study.id}, function (responseDateArray) {
                    responseDateArray.reverse();
                    return $q.all(responseDateArray.map(function (responseDate) {
                            responseDate.startDate = new Date(responseDate.startDate);
                            responseDate.endDate = new Date(responseDate.startDate.getTime() + responseDate.duration * 60000);
                            responseDate.participants = 0;
                            responseDate.participations = [];
                            if (isNaN(responseDate.deadline)) {
                                console.warn("deadline is not a number");
                            }
                            responseDate.deadlineDate = new Date(responseDate.startDate.getTime() - responseDate.deadline * 3600000);
                            if (responseDate.deadlineDate < new Date()) {
                                responseDate.status = "finished";
                            }
                            $scope.participations.$promise.then(function () {

                                $scope.participations.forEach(function (participation) {
                                    if (participation.studyDateId == responseDate.id) {
                                        responseDate.participations.push(participation);
                                        responseDate.participants += 1;
                                    }
                                });

                                if (responseDate.participants >= responseDate.maxParticipants) {
                                    responseDate.status = "reserved";
                                }

                                if (!$scope.isOwner) {
                                    if ($scope.myParticipation && ($scope.myParticipation.studyDateId == responseDate.id)) {
                                        responseDate.participating = true;
                                        if (responseDate.startDate < new Date()) {
                                            $scope.alreadyParticipated = true;
                                        }
                                    }
                                }
                            });
                            $scope.datesAreReady = true;
                            return responseDateArray;
                        })
                    );
                })


            }

            function loadParticipations() {
                $scope.participations = Participation.find({
                    filter: {
                        where: {
                            studyId: $scope.study.id,
                            status: {neq: 'declined'}
                        }
                    }
                }, function (responseParticipationArray) {
                    var result = responseParticipationArray.map(function (a) {
                        return a.id;
                    });

                    $q.all(responseParticipationArray.map(function (responseParticipation) {
                        responseParticipation.name = $filter('translate')('STUDY_DETAILS.LOADING_PARTICIPANT');
                        Participation.participant({id: responseParticipation.id}, function (responseUser) {
                            responseParticipation.name = (responseUser.firstName + " " + responseUser.secondName);
                            Preference.findOne({filter: {where: {subuserId: responseUser.id}}}, function (r) {
                                if (r.gender == 'female') {
                                    $scope.femaleParticipants += 1;
                                } else if (r.gender == 'male') {
                                    $scope.maleParticipants += 1;
                                } else {
                                    console.log("Mr. " + responseUser.lastname + " has not specified a gender");
                                }
                            });

                        });
                        $scope.totalParticipants += 1;
                    }));
                });

                if ($scope.isOwner) {

                } else {
                    Participation.find({
                        filter: {
                            where: {
                                participantId: LoopBackAuth.currentUserId,
                                studyId: $scope.study.id
                            }
                        }
                    }, function (response) {
                        if (!response.length) {
                            return;
                        }
                        $scope.isParticipating = true;
                        $scope.myParticipation = response[0];
                        if (response[0].reward_money) {
                            $scope.chosenReward = "reward_money"
                        }
                        if (response[0].reward_voucher) {
                            $scope.chosenReward = "reward_voucher"
                        }
                        if (response[0].reward_hours) {
                            $scope.chosenReward = "reward_hours"
                        }
                    });
                }

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

                    $scope.datesGroupedByDay.forEach(function (d) {
                        d.forEach(function (date) {
                            if (date.participating) {
                                $scope.datesGroupedByDay[0].show = false;

                                d.show = true;
                            }
                        })
                    })
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

            function calculateRequirements() {
                $scope.visualAidArray = [];
                if ($scope.study.visualAid_required.glasses) {
                    $scope.visualAidArray.push($filter('translate')('CREATE_STUDY.GLASSES'));
                }
                if ($scope.study.visualAid_required.contactLenses) {
                    $scope.visualAidArray.push($filter('translate')('CREATE_STUDY.CONTACTS'));
                }
                if ($scope.study.visualAid_required.none) {
                    $scope.visualAidArray.push($filter('translate')('CREATE_STUDY.NO_VISUAL_AID'));
                }

                $scope.languageArray = [];
                if ($scope.study.language_required.english) {
                    $scope.languageArray.push($filter('translate')('CREATE_STUDY.ENGLISH'));
                }
                if ($scope.study.language_required.german) {
                    $scope.languageArray.push($filter('translate')('CREATE_STUDY.GERMAN'));
                }

                $scope.smartphoneArray = [];
                if ($scope.study.operatingSystem_required.android) {
                    $scope.smartphoneArray.push($filter('translate')('CREATE_STUDY.ANDROID'));
                }
                if ($scope.study.operatingSystem_required.ios) {
                    $scope.smartphoneArray.push($filter('translate')('CREATE_STUDY.IOS'));
                }
                if ($scope.study.operatingSystem_required.windows) {
                    $scope.smartphoneArray.push($filter('translate')('CREATE_STUDY.WINDOWS'));
                }

                if ($scope.study.required_handedness) {
                    $scope.handedness = $filter('translate')('CREATE_STUDY.' + $scope.study.required_handedness.toUpperCase());
                }

                if ($scope.study.required_study_programs_array.length) {
                    $scope.student = $filter('translate')('STUDY_DETAILS.YES');
                }
            }

            $scope.updateReward = function () {
                if (!$scope.isParticipating) {
                    return
                }
                $scope.myParticipation.reward_money = mapReward("reward_money", $scope.chosenReward);
                $scope.myParticipation.reward_voucher = mapReward("reward_voucher", $scope.chosenReward);
                $scope.myParticipation.reward_hours = mapReward("reward_hours", $scope.chosenReward);
                $scope.myParticipation.$save().then(function () {
                    ToastService.setToastText($filter('translate')('STUDY_DETAILS.REWARD_UPDATED'));
                    ToastService.displayToast();
                });

            };

            $scope.participate = function (studyDate) {
                $scope.waitingForParticipation = true;

                if (!$scope.chosenReward) {
                    ToastService.setToastText($filter('translate')('STUDY_DETAILS.REWARD_NOT_CHOSEN'));
                    ToastService.displayToast();
                    $scope.waitingForParticipation = false;
                    return
                }

                ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATING'));
                ToastService.displayToast();

                Participation.count({
                    where: {
                        participantId: LoopBackAuth.currentUserId,
                        studyId: $scope.study.id
                    }
                }, function (response) {
                    if (response.count > 0) {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATION_FAILED'));
                        ToastService.displayToast();
                        $scope.waitingForParticipation = false;
                    } else {
                        $scope.myParticipation = Subuser.participations.create({
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
                    Subuser.participations.destroyAll(
                        {id: LoopBackAuth.currentUserId},
                        {filter: {where: {studyDateId: studyDate.id}}}, function (response) {
                            ToastService.setToastText($filter('translate')('STUDY_DETAILS.PARTICIPATION_WITHDRAWN'));
                            ToastService.displayToast();
                            studyDate.participating = false;
                            if ($scope.myParticipation.status != 'declined') {
                                studyDate.participants -= 1
                            }
                            ;
                            $scope.isParticipating = false;
                            $scope.waitingForParticipation = false;
                            studyDate.status = "available";
                        }, function (error) {
                            console.log("Error deleting Participation");
                            console.log(error);
                            $scope.waitingForParticipation = false;
                        });

                });
            };

            $scope.updateParticipationStatus = function (participation, status) {
                participation.status = status;
                var name = participation.name;
                participation.$save().then(function () {
                    participation.name = name;
                    if (status == 'completed') {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.COMPLETED'));
                        ToastService.displayToast();
                        //TODO add VPS to profile
                    }
                });
            };

            $scope.editStudy = function () {
                $location.path('/study-details-edit').search({'study': $scope.study.id});
            };

            $scope.toggleDay = function (day) {
                day.show = !day.show;
            };


            var helpDialog = $mdDialog.confirm()
                .title($filter('translate')('STUDY_DETAILS.HELP_1'))
                .htmlContent(
                    $filter('translate')('CREATE_STUDY.EXPLANATION_1') + "<br>" +
                    $filter('translate')('CREATE_STUDY.EXPLANATION_2') + "<br>" +
                    $filter('translate')('CREATE_STUDY.EXPLANATION_3') + " " +
                    $filter('translate')('CREATE_STUDY.EXPLANATION_4') + " " +
                    $filter('translate')('CREATE_STUDY.EXPLANATION_5')
                )
                .ariaLabel($filter('translate')('CREATE_STUDY.EXPLANATION_1'))
                .ok($filter('translate')('CREATE_STUDY.EXPLANATION_OK'));


            $scope.help = function () {
                $mdDialog.show(helpDialog).then(function () {
                }, function () {
                });
            }


            $scope.showParticipantDetails = function (participation, ev) {
                var confirm = $mdDialog.confirm({
                    locals: {data: participation},
                    controller: "ParticipantDetailsDialogController",
                    template: '<participant-details-dialog></participant-details-dialog-dialog>',
                    clickOutsideToClose: false,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: true
                });

                $mdDialog.show(confirm);
            };

            $scope.sendMailToParticipants = function () {
                //TODO send mail to all participants of the study
            }
        }]);
