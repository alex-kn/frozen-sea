
'use strict';

angular.module('editProfile', ['ngRoute', 'ngMaterial'])
    .controller('editProfileController', ['$scope', 'Subuser','$route', '$filter', '$translate','ToastService','LoopBackAuth','Participation','Study',
        function ($scope, Subuser, $route, $filter, $translate,ToastService, LoopBackAuth, Participation, Study) {
            $scope.title = 'Profil bearbeiten';
            $scope.input = {};
            $scope.error = {};
            $scope.myRewards = {};
            $scope.contentsLoaded = [false, false];
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


            function getRewards(){
                var rewardMoney = 0;
                var rewardVouchers = 0;
                var rewardHours = 0;

                Participation.find({
                    filter: {
                        where: {
                            participantId: LoopBackAuth.currentUserId
                        }
                    }
                }, function(userParticipations){
                    console.log(userParticipations);
                    for(var i = 0; i < userParticipations.length; i++) {
                        //get find once get id's with function

                        Study.find({
                            filter: {
                                where: {
                                    id: userParticipations[i].studyId
                                }
                            }
                        }, function(Study){
                            if(Study.approved == true){
                                if (userParticipations[i].status == 'completed') {
                                    rewardMoney += userParticipations[i].reward_money;
                                    rewardVouchers += userParticipations[i].reward_voucher;
                                    rewardHours += userParticipations[i].reward_hours;
                                }
                            }
                        });
                    }
                    $scope.myRewards = {money: rewardMoney, vouchers: rewardVouchers, hours: rewardHours};
                    $scope.contentsLoaded[1] = true;
                });
            }

            /*
            $scope.changeUsername = function(){
                Subuser.prototype$updateAttributes({ id: $scope.userId }, {'username': $scope.input.name}, function(){
                    $route.reload();
                    ToastService.setToastText($filter('translate')('EDIT_PROFILE.SUCCESS_USERNAME'));
                    ToastService.displayToast();
                },function(err) {
                    if (err.data.error.status == 422) {
                        $scope.error.username ='Username existiert bereits.';
                    } else {
                        $scope.error.username = err.data.error.message;
                    }
                })
            };
            */

        }]);
