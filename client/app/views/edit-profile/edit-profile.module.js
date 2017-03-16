
'use strict';

angular.module('editProfile', ['ngRoute', 'ngMaterial'])
    .controller('editProfileController', ['$scope', 'Subuser','$route', '$filter', '$translate','ToastService','LoopBackAuth','Participation','Study',
        function ($scope, Subuser, $route, $filter, $translate,ToastService, LoopBackAuth, Participation, Study) {
            $scope.title = 'Profil bearbeiten';
            $scope.input = {};
            $scope.error = {};
            $scope.contentsLoaded = [false, false];
            $scope.myRewards = {
                money: 0,
                vouchers: 0,
                hours: 0
            };

            getRewards();

            $scope.toggleActive = {
                Email: false,
                Passwort: false
            };

            $scope.currentUserData = {
                //Username:'',
                Email:'',
                //Name:'',
                Passwort:''
            };
            $scope.userId = '';

            /**
             * Get Current userdata and save to $scope.currentUserData
             */
            Subuser.getCurrent(function(userData){
                $scope.currentUserData.Email = userData.email;
                //$scope.currentUserData.Email = userData.email;
                //$scope.currentUserData.Name = userData.name;
                $scope.userId = userData.id;
                $scope.contentsLoaded[0] = true;
            });

            /**
             * Toggle arrow for dropdown
             * @param key Key of $scope.currentUserData
             */
            $scope.toggleArrow = function (key) {
                $scope.toggleActive[key] = !$scope.toggleActive[key];
            };



            $scope.changePassword = function() {
                $scope.contentsLoaded[0] = false;
                var comparePassword = $scope.input.newPassword == $scope.input.repeatNewPassword;

                if(!comparePassword){
                    $scope.error.newPassword = "Neues Passwort stimmt nicht überein.";
                } else {
                    $scope.error.newPassword = '';
                }

                Subuser.login({username: $scope.currentUserData.Email, password: $scope.input.oldPassword}, function(){
                    if (comparePassword) {
                        Subuser.prototype$updateAttributes({id: $scope.userId}, {'password': $scope.input.newPassword}, function () {
                            $scope.contentsLoaded[0] = true;
                            $route.reload();
                            ToastService.setToastText($filter('translate')('EDIT_PROFILE.SUCCESS_PASSWORD'));
                            ToastService.displayToast();
                        }, function (err) {
                            $scope.error = err.data.error.message;
                        })
                    }
                    $scope.error.oldPassword = '';
                }, function() {
                    console.log();
                    $scope.error.oldPassword = 'Altes Passwort stimmt nicht überein.';
                });

            };

            //WARNING: Calculation is only correct if there is only ONE Participation per study
            function getRewards(){
                var rewardMoney = 0;
                var rewardVouchers = 0;
                var rewardHours = 0;
                console.log(LoopBackAuth.currentUserId)
                Participation.find({
                    filter: {
                        where: {
                            participantId: LoopBackAuth.currentUserId
                        }
                    }
                }, function(userParticipations){
                        Study.find({}, function(Study){
                            for (var i = 0; i < Study.length; i++) {
                                for(var j = 0; j < userParticipations.length; j++) {
                                    if (Study[i].id == userParticipations[j].studyId) {
                                        if (Study[i].approved == true) {
                                            if (userParticipations[j].status == 'completed') {
                                                $scope.myRewards = {
                                                    money: rewardMoney += userParticipations[j].reward_money,
                                                    vouchers: rewardVouchers += userParticipations[j].reward_voucher,
                                                    hours: rewardHours += userParticipations[j].reward_hours
                                                };
                                            }
                                        }
                                    }
                                }
                            }
                        });
                });
                $scope.contentsLoaded[1] = true;
            }

        }]);
