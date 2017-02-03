/**
 * Created by Mathis on 02-Feb-17.
 */

angular
    .module('participateDialogDirective', [])
    .controller('ParticipateDialogController', ['$scope', 'Participation', 'Study', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$translate', '$filter',
        function ($scope, Participation, Study, $mdDialog, $location, Subuser, LoopBackAuth, $translate, $filter) {



            var mapReward = function(testThis, userChoice) {
                switch(testThis) {
                    case "reward_money":
                        if(userChoice == "reward_money") {
                            return $scope.currentStudy.reward_money;
                        }
                        break;
                    case "reward_voucher":
                        if(userChoice == "reward_voucher") {
                            return $scope.currentStudy.reward_voucher;
                        }
                        break;
                    case "reward_hours":
                            if(userChoice == "reward_hours") {
                                return $scope.currentStudy.reward_hours;
                            }
                }
                return 0
            };

            $scope.participate = function(studyDate, reward) {
                Participation.create(
                    {
                        "status": "reserved",
                        "reward_money": mapReward("reward_money", reward),
                        "reward_voucher": mapReward("reward_voucher", reward),
                        "reward_hours": mapReward("reward_hours", reward),
                        "studyId": $scope.currentStudy.id,
                        "studyDateId": studyDate.id,
                        "subuserId": LoopBackAuth.currentUserId,
                        "participantId": LoopBackAuth.currentUserId
                    }
                );
                $mdDialog.hide();
            };

            $scope.close = function() {
                $mdDialog.hide();
            }

        }])
    .directive('participateDialog', function () {
        return {
            templateUrl: 'components/participate-dialog/participate-dialog.template.html'
        }
    });

