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

    .controller('StudyDetailsViewController', ['$location', '$routeParams', '$scope', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study) {

            $scope.isOwner = false;

            $scope.study = Study.findById({id: $routeParams.study}, function (response) {
                $scope.study.startDate = new Date($scope.study.startDate);
                $scope.study.endDate = new Date($scope.study.endDate);
                $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                loadDates();
            });

            function loadDates() {
                $scope.appointments = Study.dates({id: $scope.study.id}, function (response) {
                    return Promise.all(response.map(function (res) {
                        res.startDate = new Date(res.startDate);
                        res.endDate = new Date(res.startDate.getTime() + res.duration*60000);
                        return res;
                    }));
                });
            }

            function mapReward(testThis, userChoice) {
                switch (testThis) {
                    case "reward_money":
                        if (userChoice == "reward_money") {
                            return $scope.currentStudy.reward.reward_money;
                        }
                        break;
                    case "reward_voucher":
                        if (userChoice == "reward_voucher") {
                            return $scope.currentStudy.reward.reward_voucher;
                        }
                        break;
                    case "reward_hours":
                        if (userChoice == "reward_hours") {
                            return $scope.currentStudy.reward.reward_hours;
                        }
                }
                return 0
            };


            $scope.participate = function (studyDate) {
                //TODO add reward and studyDate
                Participation.create({
                    status: "reserved",
                    reward_money: mapReward("reward_money", reward),
                    reward_voucher: mapReward("reward_voucher", reward),
                    reward_hours: mapReward("reward_hours", reward),
                    studyId: $scope.currentStudy.id,
                    studyDateId: studyDate.id,
                    participantId: LoopBackAuth.currentUserId
                }, function (response) {
                    ToastService.setToastText($scope.study.name, 'participate');
                    console.log("Participation created.");
                }, function (error) {
                    console.log("Participation could not be created.");
                    console.log(error);
                });

            }

            $scope.editStudy = function () {
                $location.path('/study-details-edit').search({'study': $scope.study.id});
            }


        }]);