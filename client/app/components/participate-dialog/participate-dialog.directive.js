/**
 * Created by Mathis on 02-Feb-17.
 */

angular
    .module('participateDialogDirective', [])
    .controller('ParticipateDialogController', ['$scope', 'Participation', 'Study', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$translate', '$filter',
        function ($scope, Participation, Study, $mdDialog, $location, Subuser, LoopBackAuth, $translate, $filter) {




            $scope.participate = function (title, studyId, ev) { //TODO: prompt which lets you choose a study date
                Participation.create(
                    {
                        "status": "reserved",
                        "reward_money": 0,
                        "reward_voucher": 0,
                        "reward_hours": 0,
                        "studyId": studyId,
                        "studyDateId": "TODO",
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

