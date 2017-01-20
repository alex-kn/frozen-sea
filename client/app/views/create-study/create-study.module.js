/**
 * Created by jan on 03.01.17.
 */

'use strict';

angular.module('createStudy', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/create-study/:study', {
            templateUrl: 'views/home/create-study.template.html',
            controller: 'CreateStudyController'
        });
    }])

    .controller('CreateStudyController', ['$scope', '$routeParams', '$location', '$mdDialog', 'Study', 'LoopBackAuth', function($scope, $routeParams, $location, $mdDialog,  Study, LoopBackAuth) {

        $scope.readonly = false;
        $scope.title = 'Studie erstellen';


        $scope.study = {

            name: $routeParams.study,
            duration: '',
            tags: [],
            rewards: {
                money: false,
                voucher: false,
                hours: false
            }
       };

        /**
         * Instantiate datepickers
         * minStartDate is set to current date, minEndDate to minStartDate + 1
         */

        $scope.startDate = new Date();
        $scope.endDate = new Date(
            $scope.startDate.getFullYear(),
            $scope.startDate.getMonth(),
            $scope.startDate.getDate() + 1);

        $scope.minEndDate = new Date (
            $scope.startDate.getFullYear(),
            $scope.startDate.getMonth(),
            $scope.startDate.getDate() + 1);

        // Get current user to save as
        var _currentUserId = LoopBackAuth.currentUserId;

        $scope.appointments = [];
        $scope.appointmentDate = $scope.startDate;

        /**
         * Allows user to add study appointments
         *
         * @param date date
         * @param time date
         * @param duration int
         */
        $scope.addAppointment = function(date, time, duration) {

            var appointment = {
                'date': date,
                'time': time,
                'duration': duration
            };

            $scope.appointments.push(appointment);

        };

        $scope.removeAppointment = function(item) {
            var index=$scope.appointments.indexOf(item)
            $scope.appointments.splice(index,1);
        };


        /**
         * Save study to database
         * @param title string
         * @param description string
         * @param startDate date
         * @param endDate date
         * @param _currentUserId string
         */
        $scope.createStudy = function(title, description, startDate, endDate, _currentUserId) {

            if ($scope.createStudyForm.$valid) {

                return Study
                    .create({
                        title: title,
                        description: description,
                        startDate: startDate,
                        endDate: endDate,
                        owner: _currentUserId
                    })
                    .$promise
                    .then(function (response) {
                        $location.path('/home');
                    });
            } else {

            }
        };

        /**
         * Show prompt whether user wants to delete current study
         * @param ev event
         */
        $scope.cancelStudy = function(ev) {

            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Möchtest du die Studie ' + $scope.study.name + 'löschen?' )
                .textContent('Dein gesamter Fortschritt wird gelöscht')
                .ariaLabel('Fortschritt löschen')
                .targetEvent(ev)
                .ok('Studie löschen')
                .cancel('Abbrechen');

            $mdDialog.show(confirm).then(function() {
                $location.path('/home');
            }, function() {
                console.log('Keep on creating, fool :D');
            });
        };

        /**
         * StudyProgram autocomplete
         */
        var self = this;

        self.readonly = false;
        self.selectedStudyProgram = null;
        self.searchText = null;
        self.querySearch = querySearch;
        self.studyPrograms = loadStudyPrograms();
        self.selectedstudyPrograms = [];
        self.autocompleteRequireMatch = true;
        self.transformChip = transformChip;

        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        }

        /**
         * Search for studyPrograms.
         */
        function querySearch (query) {
            var results = query ? self.studyPrograms.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(studyProgram) {
                return (studyProgram._lowername.indexOf(lowercaseQuery) === 0) ||
                    (studyProgram._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadStudyPrograms() {

            var studyPrograms = [
                {
                    'name': 'Mathematik',
                    'type': 'Bachelor'
                },
                {
                    'name': 'Knödel',
                    'type': 'Bachelor'
                }
            ];


            return studyPrograms.map(function (program) {
                program._lowername = program.name.toLowerCase();
                program._lowertype = program.type.toLowerCase();
                return program;
            });
        }

    }]);
