/**
 * Created by Alex on 11.03.2017.
 */

angular
    .module('participantDetailsDialogDirective', [])
    .controller('ParticipantDetailsDialogController', ['$scope', 'Participation', 'Study', '$mdDialog', 'Subuser', '$translate', '$filter', 'ToastService','data',
        function ($scope, Participation, Study, $mdDialog, Subuser, $translate, $filter, ToastService, data) {

            $scope.contact = function() {
                //TODO mailto participant
            };

            $scope.participation = data;

            Participation.participant({id: $scope.participation.id}, function (r) {
                $scope.user = r;
                $scope.pref = Subuser.preferences({id: r.id})
            });

            $scope.reward = null;

            if ($scope.participation.reward_hours){
                $scope.reward = $filter('translate')('CREATE_STUDY.HOURS');
            }else if($scope.participation.reward_money){
                $scope.reward = $filter('translate')('CREATE_STUDY.MONEY');
            }else if($scope.participation.reward_voucher) {
                $scope.reward = $filter('translate')('CREATE_STUDY.VOUCHER');
            }


        }])
    .directive('participantDetailsDialog', function () {
        return {
            templateUrl: 'components/participant-details-dialog/participant-details-dialog.template.html'
        }
    });

