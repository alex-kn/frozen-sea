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

    .controller('StudyDetailsViewController', ['$q', '$location', '$routeParams', '$scope', 'StudyDate', 'Subuser', 'Participation', 'LoopBackAuth', '$http', 'Study', '$filter','ToastService',
        function ($q, $location, $routeParams, $scope, StudyDate, Subuser, Participation, LoopBackAuth, $http, Study, $filter, ToastService) {

            $scope.isOwner = false;

            $scope.study = Study.findById({id: $routeParams.study}, function (response) {
                $scope.study.startDate = new Date($scope.study.startDate);
                $scope.study.endDate = new Date($scope.study.endDate);
                $scope.isOwner = ($scope.study.ownerId == LoopBackAuth.currentUserId);
                $scope.isOwner = true;
                loadDates();
                groupDatesByDay();
            });

            function loadDates() {
                $scope.appointments = Study.dates({id: $scope.study.id}, function (response) {
                    return $q.all(response.map(function (response) {
                        response.startDate = new Date(response.startDate);
                        response.endDate = new Date(response.startDate.getTime() + response.duration*60000);
                        response.participants = 0;

                        if($scope.isOwner){
                            StudyDate.participations({id: response.id}, function (res){

                                $q.all(res.map(function (participation){
                                    Participation.participant({id: participation.id},function(r){
                                        participation.name = (r.username);
                                    });
                                }));

                                response.participations = res;
                                response.participants = res.length;

                                if(response.participants >= response.maxParticipants){
                                    response.status = "reserved";
                                }
                            })
                        }else{
                            StudyDate.participations.count({id: response.id},function (res){
                                response.participants = res.count;
                                if(response.participants >= response.maxParticipants){
                                    response.status = "reserved";
                                }
                            });
                        }


                        return response;
                    }));
                });
            }


            function groupDatesByDay(){

                $scope.datesGroupedByDay = [];
                var days = [];
                var day;
                var lastDay;

                $scope.appointments.$promise.then(function(res){

                    res.sort(function(a,b){
                        return a.startDate - b.startDate;

                    });
                    $q.all(res.map(function (date){
                        day = $filter('date')(date.startDate, "shortDate");

                        if(lastDay == undefined) {
                            lastDay = day;
                        }
                        if(day != lastDay) {
                            $scope.datesGroupedByDay.push(days);
                            days = [];
                            days.push(date);
                            lastDay = day;
                        }else{
                            days.push(date);
                        }
                    }));
                    $scope.datesGroupedByDay.push(days);
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


            $scope.participate = function (studyDate) {
                Participation.create({
                    status: "reserved",
                    reward_money: mapReward("reward_money", $scope.chosenReward),
                    reward_voucher: mapReward("reward_voucher", $scope.chosenReward),
                    reward_hours: mapReward("reward_hours", $scope.chosenReward),
                    studyId: $scope.study.id,
                    studyDateId: studyDate.id,
                    participantId: LoopBackAuth.currentUserId
                }, function (response) {
                    ToastService.setToastText($scope.study.title, 'participate');
                    ToastService.displayToast();
                    console.log("Participation created.");
                }, function (error) {
                    console.log("Participation could not be created.");
                    console.log(error);
                });

            };

            $scope.declineParticipation = function (participation){

            };

            $scope.confirmParticipation = function (participation){
                participation.status = "confirmed";
                participation.$save();
            };

            $scope.editStudy = function () {
                $location.path('/study-details-edit').search({'study': $scope.study.id});
            };

        }]);