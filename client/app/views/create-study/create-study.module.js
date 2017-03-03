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

    .controller('CreateStudyController', ['$scope', '$routeParams', '$location', '$mdDialog', 'Study', 'StudyDate', 'LoopBackAuth', '$http', 'ToastService',
        function ($scope, $routeParams, $location, $mdDialog, Study, StudyDate, LoopBackAuth, $http, ToastService) {

            var startDate = new Date();
            var endDate = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + 1);

            var minEndDate = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + 1);

            $scope.study = {
                name: $routeParams.study,
                duration: 30,
                location: null,
                tags: [],
                description: '',
                startDate: startDate,
                endDate: endDate,
                minEndDate: minEndDate,
                adviser: '',
                money: null,
                voucher: null,
                hours: null,
                keywords: [],
                locations: []
            };

            $scope.appointment = {
                date: $scope.study.startDate,
                time: '08:30',
                bufferTime: null,
                duration: $scope.study.duration,
                deadline: $scope.study.startDate,
                location: null,
                participants: 1
            };

            $scope.appointments = [];

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
            $scope.title = 'Studie erstellen';

            /**
             * Instantiate datepickers
             * minStartDate is set to current date, minEndDate to minStartDate + 1
             */


            $http.get('resc/files/studyprograms.txt')
                .then(function (response) {
                    $scope.studyPrograms = response.data.split("\n");
                });

            /**
             * Add the appointment duration time to the previous appointment time
             *
             * @param appointmentTime {string}
             * @param duration {int}
             * @param buffer {int}
             * @returns {string}
             */
            function addDurationToAppointmentTime(appointmentTime, duration, buffer) {

                var time = appointmentTime.split(':');
                console.log(time);
                var hours = parseInt(time[0]);
                var minutes = parseInt(time[1]);

                if (minutes + duration + buffer >= 60) {

                    hours++;
                    minutes = minutes + duration + buffer - 60;

                } else {

                    minutes = minutes + duration + buffer;

                }

                if (hours > 23) hours = 0;
                if (hours < 10) hours = '0' + hours;
                if (minutes < 10) minutes = '0' + minutes;

                return hours + ':' + minutes;
            }


            $scope.addAppointment = function () {

                var appointment = {
                    'date': $scope.appointment.date,
                    'time': $scope.appointment.time,
                    'bufferTime': $scope.appointment.bufferTime,
                    'duration': $scope.study.duration,
                    location: $scope.appointment.location,
                    participants: $scope.appointment.participants,
                    deadline: $scope.appointment.deadline
                };

                $scope.appointments.unshift(appointment);
                $scope.appointment.time = addDurationToAppointmentTime(appointment.time, appointment.duration, appointment.bufferTime);

            };


            $scope.removeAppointment = function (item) {
                var index = $scope.appointments.indexOf(item);
                $scope.appointments.splice(index, 1);
            };


            $scope.createStudy = function () {

                if ($scope.createStudyForm.$valid) {

                    console.log('create');

                    return Study
                        .create({
                            title: $scope.study.name,
                            description: $scope.study.description,
                            startDate: $scope.study.startDate,
                            endDate: $scope.study.endDate,
                            ownerId: LoopBackAuth.currentUserId,
                            duration: $scope.study.duration,

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
                            }
                        })
                        .$promise
                        .then(function (response) {

                            // log study title to show in toast on home
                            ToastService.setToastText($scope.study.name, 'create');

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
                                        deadline: $scope.appointment.deadline,
                                        location: $scope.appointment.location,
                                        maxParticipants: $scope.appointment.participants,
                                        minParticipants: 0
                                    })
                                    .$promise
                                    .then(function (response) {
                                        console.log(response);
                                    });

                            }

                            $location.path('/home');
                        });
                }
            };

            /**
             * Show prompt whether user wants to delete current study
             * @param ev event
             */
            $scope.cancelStudy = function (ev) {

                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Möchtest du die Studie ' + $scope.study.name + 'löschen?')
                    .textContent('Dein gesamter Fortschritt wird gelöscht')
                    .ariaLabel('Fortschritt löschen')
                    .targetEvent(ev)
                    .ok('Studie löschen')
                    .cancel('Abbrechen');

                $mdDialog.show(confirm).then(function () {
                    $location.path('/home');
                }, function () {
                    console.log('Keep on creating, fool :D');
                });
            };

        }]);
