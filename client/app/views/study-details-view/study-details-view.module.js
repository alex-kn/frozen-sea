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

    .controller('StudyDetailsViewController', ['$mdDialog', '$q', '$location', '$routeParams', '$scope', 'StudyDate', 'Preference', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study', '$filter', 'ToastService', 'EmailService', 'ByRoleService',
        function ($mdDialog, $q, $location, $routeParams, $scope, StudyDate, Preference, Subuser, Participation, LoopBackAuth, $http, Study, $filter, ToastService, EmailService, ByRoleService) {

            $scope.isOwner = false;
            $scope.isAdvisor = false;
            $scope.studyIsLoading = true;
            $scope.isParticipating = false;
            $scope.alreadyParticipated = false;
            $scope.totalParticipants = 0;
            $scope.participantUserIds = [];

            $scope.Math = window.Math;

            $scope.currentUser = Subuser.getCurrent();

            $scope.femaleParticipants = 0;
            $scope.maleParticipants = 0;

            $scope.flexGtXs = 45;
            $scope.flexGtMd = 30;
            $scope.flexGtLg = 30;

            $scope.showMailForm = false;

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
                    $scope.ownerMail = res.email;
                    $scope.ownerReady = true;
                });
                Study.advisor({id: $scope.study.id}, function (res) {
                    $scope.advisor = res.firstName + " " + res.secondName;
                    $scope.advisorReady = true;
                }, function (err) {
                    console.log("no advisor found");
                    $scope.advisorReady = true;
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

            ByRoleService.getUsersByRole("advisor").then(function (advisors) {
                advisors.forEach(function (advisor) {
                    if (LoopBackAuth.currentUserId == advisor.id) {
                        $scope.isAdvisor = true;
                    }
                })
            });

            /**
             * @description
             *
             * Load StudyDates belonging to the Study and assign respective Participations
             *
             */
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

            /**
             * @description
             *
             * Load Participations belonging to the Study
             */
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
                                    console.log("Mr. " + responseUser.secondName + " has not specified a gender");
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


            /**
             * @description
             *
             * Group StudyDates by day for display and
             * expand days with participants
             */
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

                    if (!$scope.isOwner) {
                        $scope.datesGroupedByDay[0].show = true;
                    }

                    $scope.datesGroupedByDay.forEach(function (d) {
                        d.forEach(function (date) {
                            if (date.participating) {
                                $scope.datesGroupedByDay[0].show = false;
                                d.show = true;
                            }
                            if ($scope.isOwner && date.participants) {
                                d.show = true;
                            }
                        })
                    })
                })
            }

            /**
             * @description
             *
             * Map the reward chosen by the user to the respective
             * values of the rewards he is getting
             *
             * @param testThis the reward as String
             * @param userChoice the reward chosen by the participant
             * @returns {*}
             */
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

            /**
             * @description
             *
             * Generate a String for each requirement for displaying on the page
             */
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

            /**
             * @description
             *
             * Update the chosen reward and save it to the DB
             *
             * Called then participant changes his choice of reward
             */
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

            /**
             * @description
             *
             * Create a Participation for the participant if a reward is chosen and the StudyDate is available
             *
             * @param studyDate the StudyDate on which the user wants to participate
             */
            $scope.participate = function (studyDate) {
                $scope.waitingForParticipation = true;

                if (!$scope.chosenReward) {
                    ToastService.setToastText($filter('translate')('STUDY_DETAILS.REWARD_NOT_CHOSEN'));
                    ToastService.displayToast();
                    $scope.waitingForParticipation = false;
                    return
                }
                studyDate.waiting = true;

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
                        studyDate.waiting = false;
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
                            studyDate.waiting = false;
                            var subject = "New participant for your study!";
                            var text = "A new participants has requested to participate in your Study \"" + $scope.study.title + "\" and is awaiting confirmation.";
                            EmailService.sendEmail($scope.ownerMail, $scope.currentUser.email, subject, text, text, true);
                        }, function (error) {
                            console.log("Participation could not be created.");
                            console.log(error);
                            $scope.waitingForParticipation = false;
                            studyDate.waiting = false;
                        });
                    }
                });


            };

            /**
             * @description
             *
             * Delete the Participation of the participant for the StudyDate
             *
             * @param studyDate the StudyDate the participation is withdrawn from
             */
            $scope.withdrawParticipation = function (studyDate) {
                $scope.waitingForParticipation = true;
                studyDate.waiting = true;
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

                            $scope.isParticipating = false;
                            $scope.waitingForParticipation = false;
                            studyDate.waiting = false;
                            studyDate.status = "available";
                        }, function (error) {
                            console.log("Error deleting Participation");
                            console.log(error);
                            $scope.waitingForParticipation = false;
                            studyDate.waiting = false;
                        });

                });
            };

            /**
             * @description
             *
             * Update the status of the Participation
             *
             * @param participation the Participation
             * @param status the new status (pending, confirmed, completed, absent, declined)
             */
            $scope.updateParticipationStatus = function (participation, status) {
                participation.status = status;
                var name = participation.name;
                participation.$save().then(function () {
                    participation.name = name;
                    if (status == 'completed') {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.COMPLETED'));
                        ToastService.displayToast();
                    }
                });
            };

            $scope.editStudy = function () {
                $location.path('/study-details-edit').search({'study': $scope.study.id});
            };

            /**
             * @description
             *
             * Show/hide the StudyDates of a specific day
             *
             * @param day
             */
            $scope.toggleDay = function (day) {
                day.show = !day.show;
            };

            /**
             * @description
             *
             * Unlock the study (for Supervisors)
             */
            $scope.unlock = function () {
                Study.update({where: {id: $scope.study.id}}, {approved: true});
                $scope.study.approved = true;
            };

            /**
             * @description
             *
             * Relock the study (for Supervisors)
             */
            $scope.relock = function () {
                Study.update({where: {id: $scope.study.id}}, {approved: false});
                $scope.study.approved = false;
            };


            /**
             * @description
             *
             * Show help dialog
             */
            $scope.help = function () {
                if ($scope.isOwner) {
                    var html = "<p>" +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_OWNER_1') + "</p><p> " +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_OWNER_2') + "</p><p>" +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_OWNER_3') + "</p><p>" +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_OWNER_4') + "</p><p>" +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_OWNER_5') + "</p>"
                } else {
                    var html = "<p>" +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_1') + "</p><p> " +
                        $filter('translate')('STUDY_DETAILS.EXPLANATION_2') + "</p>"
                }

                var helpDialog = $mdDialog.confirm()
                    .title($filter('translate')('STUDY_DETAILS.HELP'))
                    .htmlContent(html)
                    .ariaLabel($filter('translate')('STUDY_DETAILS.HELP'))
                    .ok($filter('translate')('CREATE_STUDY.EXPLANATION_OK'));

                $mdDialog.show(helpDialog).then(function () {
                }, function () {
                });
            }

            /**
             * @description
             *
             * Show details for a participant
             *
             * @param participation the Participation of the participant
             * @param ev
             */
            $scope.showParticipantDetails = function (participation, ev) {
                var confirm = $mdDialog.confirm({
                    locals: {data: participation},
                    controller: "ParticipantDetailsDialogController",
                    template: '<participant-details-dialog></participant-details-dialog-dialog>',
                    clickOutsideToClose: false,
                    parent: angular.element(document.body),
                    ariaLabel: $filter('translate')('STUDY_DETAILS.PARTICIPANTS_DETAILS'),
                    targetEvent: ev,
                    fullscreen: true
                });

                $mdDialog.show(confirm);
            };

            $scope.showContactForm = function () {
                $scope.showMailForm = true;
                $('html,body').animate({scrollTop: document.body.scrollHeight}, "fast");
            };

            $scope.clearContactForm = function () {
                $scope.showMailForm = false;
                $scope.subjectString = "";
                $scope.bodyString = "";
            };

            $scope.sendMailToParticipants = function () {
                if ($scope.isOwner) {
                    if(!$scope.participations.length) {
                        ToastService.setToastText($filter('translate')('STUDY_DETAILS.NO_PARTICIPANTS_TO_MAIL'));
                        ToastService.displayToast();
                        return;
                    }
                    $q.all($scope.participations.map(function (participation) {
                        Participation.participant({id: participation.id}, function (subuser) {
                            if (typeof subuser.email == 'undefined') {
                                console.log("Mail is undefined. Skipping.");
                                return;
                            }

                            EmailService.sendEmail(subuser.email, $scope.currentUser.email, $scope.subjectString, $scope.bodyString, $scope.bodyString, true);
                            console.log("send mail to " + subuser.email + " from " + $scope.currentUser.email);
                        })
                    }))
                } else {
                    console.log("send mail to " + $scope.ownerMail + " from " + $scope.currentUser.email);
                    EmailService.sendEmail($scope.ownerMail, $scope.currentUser.email, $scope.subjectString, $scope.bodyString, $scope.bodyString, true);
                }
                $scope.clearContactForm();
            }
        }]);
