/**
 * Created by jan on 03.01.17.
 */
'use strict';
angular.module('createStudy', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/create-study/:study', {
            templateUrl: 'views/home/create-study.template.html',
            controller: 'CreateStudyController'
        });
    }])
    .controller('CreateStudyController', ['$scope', '$routeParams', '$rootScope',
        '$location', '$mdDialog', 'Study', 'StudyDate', 'LoopBackAuth',
        '$http', 'ToastService', 'AppointmentService', 'ByRoleService',
        '$filter', '$translate', '$document', 'Subuser', '$mdConstant', 'EmailService',
        function ($scope, $routeParams, $rootScope, $location, $mdDialog, Study, StudyDate,
                  LoopBackAuth, $http, ToastService, AppointmentService, ByRoleService,
                  $filter, $translate, $document, Subuser, $mdConstant, EmailService) {

            $scope.initialize = function() {
                ByRoleService.getUsersByRole("advisor").then(function(res) {
                    $scope.advisors = res;
                });

                $scope.today = new Date();
                $scope.tomorrow = new Date();
                $scope.tomorrow.setDate($scope.today.getDate() + 1);

                $scope.tabIndex = 0;
                $scope.preferences = {
                    studyPrograms: [],
                    age: null,
                    german: null,
                    english: null,
                    gender:null,
                    height: null,
                    handedness: null,
                    glasses: null,
                    contacts: null,
                    no_visual_aid: null,
                    android: null,
                    windows: null,
                    ios: null
                };
                $scope.readonly = false;
                $scope.title = $filter('translate')('CREATE_STUDY.CREATE_STUDY_BUTTON');

                $scope.study = {
                    name: $routeParams.study,
                    duration: 30,
                    location: null,
                    tags: [],
                    description: '',
                    endDate: $scope.tomorrow,
                    adviser: '',
                    money: null,
                    voucher: null,
                    hours: null,
                    keywords: [],
                    locations: [],
                    link: ''
                };
                $scope.appointments = [];
                $scope.appointmentsChecked = false;
                $scope.appointment = {
                    date: $scope.tomorrow,
                    time: '08:30',
                    bufferTime: null,
                    duration: $scope.study.duration,
                    deadline: 1,
                    location: null,
                    participants: 1
                };

                $scope.keySeperatorsKeywords = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, $mdConstant.KEY_CODE.SPACE];
                $scope.keySeperatorsLocations = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
            };

            /* Switch between general and requirements tab on button click */
            $scope.selectTab = function() {
                $scope.tabIndex === 1 ? $scope.tabIndex = 0 : $scope.tabIndex = 1;
                $document.scrollTop(0, 500);
            };

            /**
             * Add appointment to appointments array
             * Fill the appointment list to display appointment card
             * Requires AppointmentService
             */
            $scope.addAppointment = function() {
                var appointment = {
                    date: $scope.appointment.date,
                    time: $scope.appointment.time,
                    bufferTime: $scope.appointment.bufferTime,
                    duration: $scope.study.duration,
                    location: $scope.appointment.location,
                    participants: $scope.appointment.participants,
                    deadline: $scope.appointment.deadline
                };
                $scope.appointments.unshift(appointment);
                console.log($scope.appointments);
                $scope.appointment.time = AppointmentService.addDurationToAppointmentTime(appointment.time, appointment.duration, appointment.bufferTime);
                $scope.appointmentsChecked = true;
            };

            /**
             * Remove appointment from appointments array
             * Remove selected appointment card
             * @param item appointment object
             */
            $scope.removeAppointment= function(item) {
                var index = $scope.appointments.indexOf(item);
                $scope.appointments.splice(index, 1);
            };

            $scope.createOnlineStudy = function() {
              return Study
                  .create({
                      title: $scope.study.name,
                      description: $scope.study.description,
                      startDate: $scope.today,
                      endDate: $scope.study.endDate,
                      link: $scope.study.link,
                      ownerId: LoopBackAuth.currentUserId,
                      advisorId: JSON.parse($scope.study.adviser).id,
                      required_study_programs_array: $scope.preferences.studyPrograms,
                      minimum_age: $scope.preferences.age,
                      minimum_height: $scope.preferences.height,
                      required_handedness: $scope.preferences.handedness,
                      required_gender: {
                          male: $scope.preferences.gender === "male",
                          female: $scope.preferences.gender === "female"
                      },
                      language_required: {
                          english: $scope.preferences.language,
                          german:$scope.preferences.german
                      },
                      visualAid_required: {
                          glasses: $scope.preferences.glasses,
                          contactLenses: $scope.preferences.contacts,
                          none: $scope.preferences.no_visual_aid
                      },
                      operatingSystem_required: {
                          android: $scope.preferences.android,
                          ios: $scope.preferences.ios,
                          windows: $scope.preferences.windows
                      },
                      approved: false
                  })
                  .$promise
                  .then(function(response) {
                      console.log(response)
                      ToastService.setToastText($filter('translate')('TOAST.CREATE_STUDY'));
                      $location.path('/home');
                  });
            };

            /**
             * Create a new study object that is saved to the database
             * Iterate through the appointments array to save all related appointments
             */
            $scope.createStudy = function () {
                if ($scope.createStudyForm.$valid) {
                    return Study
                        .create({
                            title: $scope.study.name,
                            description: $scope.study.description,
                            startDate: AppointmentService.getDates($scope.appointments).startDate,
                            endDate: AppointmentService.getDates($scope.appointments).endDate,
                            creationDate: new Date(),
                            ownerId: LoopBackAuth.currentUserId,
                            duration: $scope.study.duration,
                            advisorId: JSON.parse($scope.study.adviser).id,
                            keywords_array: $scope.study.keywords,
                            locations_array: $scope.study.locations,
                            required_study_programs_array: $scope.preferences.studyPrograms,
                            minimum_age: $scope.preferences.age,
                            minimum_height: $scope.preferences.height,
                            required_handedness: $scope.preferences.handedness,
                            required_gender: {
                                male: $scope.preferences.gender === "male",
                                female: $scope.preferences.gender === "female"
                            },
                            language_required: {
                                english: $scope.preferences.language,
                                german:$scope.preferences.german
                            },
                            reward: {
                                reward_money: $scope.study.money,
                                reward_voucher:  $scope.study.voucher,
                                reward_hours:  $scope.study.hours
                            },
                            visualAid_required: {
                                glasses: $scope.preferences.glasses,
                                contactLenses: $scope.preferences.contacts,
                                none: $scope.preferences.no_visual_aid
                            },
                            operatingSystem_required: {
                                android: $scope.preferences.android,
                                ios: $scope.preferences.ios,
                                windows: $scope.preferences.windows
                            },
                            approved: false
                        })
                        .$promise
                        .then(function (response) {
                            // log study title to show in toast on home
                            ToastService.setToastText($filter('translate')('TOAST.CREATE_STUDY'));

                            $scope.emailText = "A new study with you as supervisor was created. Please navigate to <a href=" + $location.protocol() +"://" + $location.host()+ ":" + $location.port() + "/#!/study-details-view?study=" +response.id + ">" + $location.protocol() +"://" + $location.host()+ ":" + $location.port() + "/#!/study-details-view?study=" +response.id + "</a> to check and unlock the study.";
                            EmailService.sendEmail(JSON.parse($scope.study.adviser).email,
                                "frzn.sea@gmail.com",
                                "New study with you as supervisor",
                                $scope.emailText,
                                $scope.emailText,
                                false);


                            for (var i = 0; i < $scope.appointments.length; i++) {
                                var date = $scope.appointments[i].date; //only the correct date
                                var time = $scope.appointments[i].time; //only the correct hours:minutes
                                StudyDate
                                    .create({
                                        studyId: response.id,
                                        ownerId: LoopBackAuth.currentUserId,
                                        status: 'available',
                                        startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                                            parseInt(time.split(":")[0]), parseInt(time.split(":")[1])),
                                        duration: $scope.appointments[i].duration,
                                        deadline: $scope.appointments[i].deadline,
                                        location: $scope.appointments[i].location,
                                        maxParticipants: $scope.appointments[i].participants,
                                        minParticipants: 0
                                    })
                                    .$promise
                                    .then(function (response) {
                                    });
                            }

                            var confirm = $mdDialog.confirm()
                                .title($filter('translate')('CREATE_STUDY.EXPLANATION_TITLE_1') + $filter('translate')('CREATE_STUDY.EXPLANATION_TITLE_2'))
                                .htmlContent(
                                    $filter('translate')('CREATE_STUDY.EXPLANATION_1') + "<br>" +
                                    $filter('translate')('CREATE_STUDY.EXPLANATION_2') + "<br>" +
                                    $filter('translate')('CREATE_STUDY.EXPLANATION_3') + " "  +
                                    $filter('translate')('CREATE_STUDY.EXPLANATION_4') + " "  +
                                    $filter('translate')('CREATE_STUDY.EXPLANATION_5')
                                )
                                .ariaLabel($filter('translate')('CREATE_STUDY.EXPLANATION_1'))
                                .ok($filter('translate')('CREATE_STUDY.EXPLANATION_OK'));
                            $location.path('/home');
                        });
                }
            };
            /**
             * Show prompt whether user wants to delete current study
             * @param ev event
             */
            $scope.cancelStudy = function (ev) {
                var confirm = $mdDialog.confirm()
                    .title($filter('translate')('CREATE_STUDY.DELETE_1')  + $scope.study.name + $filter('translate')('CREATE_STUDY.DELETE_2'))
                    .textContent($filter('translate')('CREATE_STUDY.DELETE_3'))
                    .ariaLabel($filter('translate')('CREATE_STUDY.DELETE_3'))
                    .targetEvent(ev)
                    .ok($filter('translate')('CREATE_STUDY.DELETE_OK'))
                    .cancel($filter('translate')('CREATE_STUDY.DELETE_CANCEL'));
                $mdDialog.show(confirm).then(function () {
                    $location.path('/home');
                }, function () {
                    console.log('Keep on creating, fool :D');
                });
            };

        }]);