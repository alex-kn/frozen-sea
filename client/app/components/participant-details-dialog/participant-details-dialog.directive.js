/**
 * Created by Alex on 11.03.2017.
 */

angular
    .module('participantDetailsDialogDirective', [])
    .controller('ParticipantDetailsDialogController', ['$scope', 'Participation', 'Study', '$mdDialog', 'Subuser', '$translate', '$filter', 'ToastService', 'data', 'EmailService', 'Preference', 'LoopBackAuth', 'User',
        function ($scope, Participation, Study, $mdDialog, Subuser, $translate, $filter, ToastService, data, EmailService, Preference, LoopBackAuth, User) {


            $scope.showContactForm = false;
            $scope.participation = data;

            Participation.participant({id: $scope.participation.id}, function (r) {
                $scope.user = r;
                $scope.pref = Preference.findOne({filter:{where: {subuserId: r.id}}}, function () {
                    $scope.userDataReady = true;
                    if($scope.pref.gender) {
                        $scope.pref.genderString = $filter('translate')('USER_PREFERENCES.' + $scope.pref.gender.toUpperCase());
                    }else{
                        $scope.pref.genderString = $filter('translate')('STUDY_DETAILS.NOT_SPECIFIED');
                    }
                });

            });
            $scope.currentSubuser = Subuser.findById({id: LoopBackAuth.currentUserId});

            $scope.reward = null;

            if ($scope.participation.reward_hours) {
                $scope.reward = $filter('translate')('CREATE_STUDY.HOURS');
            } else if ($scope.participation.reward_money) {
                $scope.reward = $filter('translate')('CREATE_STUDY.MONEY');
            } else if ($scope.participation.reward_voucher) {
                $scope.reward = $filter('translate')('CREATE_STUDY.VOUCHER');
            }

            $scope.send = function () {
                console.log("send mail to " + $scope.user.email + " from " + $scope.currentSubuser.email);
                EmailService.sendEmail($scope.user.email, $scope.currentSubuser.email, $scope.subjectString, $scope.bodyString, $scope.bodyString)
            };

            $scope.clearContactForm = function () {
                $scope.showContactForm = false;
                $scope.subjectString = "";
                $scope.bodyString = "";

            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };


        }])
    .directive('participantDetailsDialog', function () {
        return {
            templateUrl: 'components/participant-details-dialog/participant-details-dialog.template.html'
        }
    });

