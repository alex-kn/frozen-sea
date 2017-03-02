/**
 * Created by Alex on 27.01.2017.
 */

'use strict';

angular.module('studyDetails', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/study-details/', {
            templateUrl: 'views/study-details/study-details.template.html',
            controller: 'StudyDetailsController'
        });
    }])

    .controller('StudyDetailsController', ['$location','$routeParams', '$scope', 'Subuser','Participation','LoopBackAuth', '$http', 'Study',
        function ($location, $routeParams, $scope, Subuser, Participation, LoopBackAuth, $http, Study) {


            $scope.study = $routeParams.study;

            console.log($scope.study);

            $scope.canEdit = false;

            if($scope.study.ownerId == LoopBackAuth.currentUserId){
                $scope.canEdit = true;
            }

            $scope.study.startDate = new Date($scope.study.startDate);
            $scope.study.endDate = new Date($scope.study.endDate);

            $scope.appointments = Study.dates({id: $scope.study.id}, function (response){
                return Promise.all(response.map(function (res){
                    res.startDate = new Date(res.startDate);
                    res.endDate = new Date(res.endDate);
                    return res;
                }));
            });

            $scope.participate = function(date){
                //TODO add reward and studyDate
                Participation.create({
                    participantId: LoopBackAuth.currentUserId,
                    studyId: $scope.study.id,
                    status: "pending"
                })
                    .$promise
                    .then(function (response){
                        $location.path('/home');
                        console.log(response);
                    });

            };

            //----------------------------------------
            //EDIT STUDY

            //rewards
            if ($scope.study.reward_money) $scope.money = true;
            if ($scope.study.reward_voucher) $scope.voucher = true;
            if ($scope.study.reward_hours) $scope.hours = true;
            $scope.resetMoney = function(){
                $scope.study.reward_money = null;
            };
            $scope.resetVoucher = function(){
                $scope.study.reward_voucher = null;
            };
            $scope.resetHours = function(){
                $scope.study.reward_hours = null;
            };


            $scope.removeAppointment = function () {

            };

            $scope.updateStudy = function () {
                $scope.study
                    .$save()
                    .then(function(res)  {
                        console.log("changes saved");
                        $scope.editing = false;
                        //TODO notify participants
                    }).catch(function(req) {
                        console.log("error saving changes");
                    });
                $scope.editing = false;
            };

            $scope.discardChanges = function () {
                $scope.editing = false;
            };

            $scope.editStudy = function () {
                $scope.editing = true;
            }

        }]);