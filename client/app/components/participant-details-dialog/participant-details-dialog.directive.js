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
                $scope.mail = r.email;
            });

            //TODO localization
            $scope.reward = "Keine";

            if ($scope.participation.reward_hours){
                $scope.reward = "VPS";
            }else if($scope.participation.reward_money){
                $scope.reward = "Geld";
            }else if($scope.participation.reward_voucher) {
                $scope.reward = "Amazon Gutschein"
            }


        }])
    .directive('participantDetailsDialog', function () {
        return {
            templateUrl: 'components/participant-details-dialog/participant-details-dialog.template.html'
        }
    });

