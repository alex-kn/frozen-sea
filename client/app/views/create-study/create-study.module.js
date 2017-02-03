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

    .controller('CreateStudyController', ['$scope', '$routeParams', '$location', '$mdDialog', 'Study', 'StudyDate', 'LoopBackAuth', '$http',
        function ($scope, $routeParams, $location, $mdDialog, Study, StudyDate, LoopBackAuth, $http) {

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
                hours: null
            };

            $scope.appointment = {
                date: $scope.study.startDate,
                time: '08:30',
                bufferTime: null,
                duration: $scope.study.duration
            };

            $scope.appointments = [];

            $scope.preferences = {
                studyProgram: null,
                age: null,
                nationality: null,
                language: null,
                gender: null,
                height: null,
                handedness: null,
                glasses: null,
                contacts: null,
                android: null,
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

            /**
             * Allows user to add study appointments
             *
             * @param date date
             * @param time date
             * @param duration int
             */
            $scope.addAppointment = function () {

                var appointment = {
                    'date': $scope.appointment.date,
                    'time': $scope.appointment.time,
                    'bufferTime': $scope.appointment.bufferTime,
                    'duration': $scope.study.duration
                }

                $scope.appointments.unshift(appointment);
                $scope.appointment.time = addDurationToAppointmentTime(appointment.time, appointment.duration, appointment.bufferTime);

            };


            $scope.removeAppointment = function (item) {
                var index = $scope.appointments.indexOf(item);
                $scope.appointments.splice(index, 1);
            };


            /**
             * Save study to database
             * @param title string
             * @param description string
             * @param startDate date
             * @param endDate date
             * @param duration int
             * @param reward string
             */
            $scope.createStudy = function () {

                if ($scope.createStudyForm.$valid) {

                    console.log('create');

                    return Study
                        .create({
                            title: $scope.study.name,
                            description: $scope.study.description,
                            startDate: $scope.study.startDate,
                            endDate: $scope.study.endDate,
                            owner: LoopBackAuth.currentUserId,
                            reward_money: $scope.study.money,
                            reward_voucher: $scope.study.voucher,
                            reward_hours: $scope.study.hours,
                            duration: $scope.study.duration,
                            required_study_program: $scope.preferences.studyProgram,
                            required_age: $scope.preferences.age,
                            required_nationality: $scope.preferences.nationality,
                            required_language: $scope.preferences.language,
                            required_gender: $scope.preferences.gender,
                            required_height: $scope.preferences.height,
                            required_glasses: $scope.preferences.glasses,
                            required_contact_lenses: $scope.preferences.contacts,
                            required_handedness: $scope.preferences.handedness,
                            required_android: $scope.preferences.android,
                            required_ios: $scope.preferences.ios
                        })
                        .$promise
                        .then(function (response) {

                            console.log(response.id);

                            for (var i = 0; i < $scope.appointments.length; i++) {

                                StudyDate
                                    .create({
                                        studyId: response.id,
                                        ownerId: LoopBackAuth.currentUserId,
                                        status: 'available',
                                        startDate: $scope.appointments[i].date,
                                        duration: $scope.appointments[i].duration,
                                        startTime: $scope.appointments[i].time
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
