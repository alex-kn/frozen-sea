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

    }]);
