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

    .controller('StudyDetailsEditController', ['$location','$routeParams', '$scope', 'Subuser','Participation','LoopBackAuth', '$http', 'Study',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study) {


            $scope.study = Study
                .findById({id: $routeParams.study}, function (response) {
                    $scope.study.startDate = new Date($scope.study.startDate);
                    $scope.study.endDate = new Date($scope.study.endDate);
                    $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                    loadDates();
                    loadRewards();
                });

            function loadDates() {
                $scope.appointments = Study.dates({id: $scope.study.id}, function (response) {
                    return Promise.all(response.map(function (res) {
                        res.startDate = new Date(res.startDate);
                        res.endDate = new Date(res.endDate);
                        return res;
                    }));
                });
            }

            function loadRewards() {
                if ($scope.study.reward.reward_money) $scope.money = true;
                if ($scope.study.reward.reward_voucher) $scope.voucher = true;
                if ($scope.study.reward.reward_hours) $scope.hours = true;
                $scope.resetMoney = function () {
                    $scope.study.reward.reward_money = null;
                }
                $scope.resetVoucher = function () {
                    $scope.study.reward.reward_voucher = null;
                }
                $scope.resetHours = function () {
                    $scope.study.reward.reward_hours = null;
                }
            }


            $scope.removeAppointment = function () {

            };

            $scope.updateStudy = function () {
                $scope.study
                    .$save()
                    .then(function(res)  {
                        console.log("changes saved");
                        $location.path('/study-details-view').search({'study': study.id});
                        //TODO notify participants
                    }).catch(function(req) {
                    console.log("error saving changes");
                });
            }

            $scope.discardChanges = function () {
                $location.path('/study-details-view').search({'study': study.id});
            }

            $scope.deleteStudy = function () {
                //TODO delete participations and studyDates aswell
                Study.deleteById({id: $scope.study.id}, function (response){
                    console.log("Study deleted!");
                    $location.path('/home');
                });
            }

        }]);