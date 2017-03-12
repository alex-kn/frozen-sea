
'use strict';

angular.module('editProfile', ['ngRoute', 'ngMaterial'])
    .controller('editProfileController', ['$scope', 'Subuser','$route', '$mdToast','LoopBackAuth','Participation',
        function ($scope, User, $route, $mdToast, LoopBackAuth, Participation) {
        $scope.title = 'Profil bearbeiten';
        $scope.input = {};
        $scope.error = {};
        $scope.myRewards = {};
        getRewards();

        $scope.toggleActive = {
            Username: false,
            Passwort: false
        };

        $scope.currentUserData = {
            Username:'',
            //Email:'',
            //Name:'',
            Passwort:''
        };
        $scope.userId = '';

        /**
         * Get Current userdata and save to $scope.currentUserData
         */
        User.getCurrent(function(userData){
            $scope.currentUserData.Username = userData.username;
            //$scope.currentUserData.Email = userData.email;
            //$scope.currentUserData.Name = userData.name;
            $scope.userId = userData.id;
        });

        /**
         * Toggle arrow for dropdown
         * @param key Key of $scope.currentUserData
         */
        $scope.toggleArrow = function (key) {
            $scope.toggleActive[key] = !$scope.toggleActive[key];
        };

        $scope.changeUsername = function(){
            User.prototype$updateAttributes({ id: $scope.userId }, {'username': $scope.input.name}, function(){
                $route.reload();
                showToast('Username erfolgreich geändert!', 'success');
            },function(err) {
                if (err.data.error.status == 422) {
                    $scope.error.username ='Username existiert bereits.';
                } else {
                    $scope.error.username = err.data.error.message;
                }
            })
        };

        $scope.changePassword = function() {
            var comparePassword = $scope.input.newPassword == $scope.input.repeatNewPassword;

            if(!comparePassword){
                $scope.error.newPassword = "Neues Passwort stimmt nicht überein.";
            } else {
                $scope.error.newPassword = '';
            }

            User.login({username: $scope.currentUserData.Username, password: $scope.input.oldPassword}, function(){
                if (comparePassword) {
                    User.prototype$updateAttributes({id: $scope.userId}, {'password': $scope.input.newPassword}, function () {
                        $route.reload();
                        showToast('Passwort erfolgreich geändert!', 'success');
                    }, function (err) {
                        $scope.error = err.data.error.message;
                    })
                }
                $scope.error.oldPassword = '';
            }, function() {
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
                for(var i = 0; i < userParticipations.length; i++) {
//TODO: Was ist status für abgeschlossene studien?
                    if (userParticipations[i].status == 'finished') {
                        rewardMoney += userParticipations[i].reward_money;
                        rewardVouchers += userParticipations[i].reward_voucher;
                        rewardHours += userParticipations[i].reward_hours;
                    }
                }
                $scope.myRewards = {money: rewardMoney, vouchers: rewardVouchers, hours: rewardHours};
            });
        }


        /**
         * Show toast
         * @param content Text oft the toast
         * @param type Type of the toast 'error' or 'success'
         */
        function showToast(content, type) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(content)
                    .position('top right')
                    .hideDelay(3000)
                    .toastClass(type)
            );
        }
    }]);
