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

    .controller('CreateStudyController', ['$scope', '$routeParams', '$location', '$mdToast', 'Study', function($scope, $routeParams, $location, $mdToast,  Study) {

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

        // 1 day after startDate
        $scope.minEndDate = new Date (
            $scope.startDate.getFullYear(),
            $scope.startDate.getMonth(),
            $scope.startDate.getDate() + 1);


        $scope.createStudy = function(title, description, startDate, endDate) {
            return Study
                .create({
                    title: title,
                    description: description,
                    startDate: startDate,
                    endDate: endDate
                })
                .$promise
                .then(function(response) {
                    $location.path('/home');
                });
        };


        /**
         * Show toast in the top-left corner after the study is created
         */
        /*var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }


        /!**
         * Toast is displayed after the user creates the study
         * If the undo button is clicked, the user is redirected to the create study containing the recent study
         * Subsequently, the study is removed from the database
         *!/
        $scope.showCreateStudyToast = function() {
            var pinTo = $scope.getToastPosition();
            var toast = $mdToast.simple()
                .textContent('Marked as read')
                .action('UNDO')
                .highlightAction(true)
                .highlightClass('md-accent')
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    alert('You clicked the \'UNDO\' action.');
                }
            });
        };*/

    }])

    .controller('ToastCtrl', function($scope, $mdToast) {
        $scope.closeToast = function() {
            $mdToast.hide();
        };
    });
