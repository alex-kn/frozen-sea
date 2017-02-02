/**
 * Created by Alexander on 15-Dec-16.
 */

angular
    .module('studyListDirective', ['participateDialogDirective'])
    .controller('StudyListController', ['$scope', 'Participation', 'Study', 'StudyDate', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$translate', '$filter',
        function ($scope, Participation, Study, StudyDate, $mdDialog, $location, Subuser, LoopBackAuth, $translate, $filter) {

            $scope.studiesTemp = Study.find(
                function(list) { /* success */ //TODO: where end date not in the past
                    filter()
                },
                function(errorResponse) {

                    console.log(errorResponse);

                }
            );

            function filter() {
                Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
                    $scope.preferences = response;
                    $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences)
                },function (error){
                    if(error.status == 404){
                        Subuser.preferences
                            .create({id: LoopBackAuth.currentUserId}, {})
                            .$promise
                            .then(function (response) {
                                filter()//obacht!
                            });

                    }
                });
            }


            //<form ng-submit="submit()" ng-controller="AppCtrl" ng-cloak>

            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            $scope.showParticipationDialog = function(study) {

                $scope.dates = StudyDate.find({where: {studyId: study.id}});

                var confirm = $mdDialog.confirm({
                    controller: "ParticipateDialogController",
                    template:   '<md-dialog aria-label="Participate">' +
                    '<md-dialog-content>' +
                    '<md-radio-group ng-model="data.group1">' +
                    '<md-radio-button ng-repeat="date in dates" value={{date.startDate}} class="md-primary">' +
                    '{{date.startDate | date: "short"}}' +
                    '</md-radio-button> ' +
                    '</md-radio-group>' +
                    '<p>Selected Date: <span class="radioValue">{{ data.group1 | date: "short"}}</span> </p>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions>' +
                    '<md-button ng-click="participate()" class="md-primary">Participate</md-button>' +
                    '<md-button ng-click="close()" class="md-primary">Cancel</md-button>' +
                    '</md-dialog-actions>' +
                    '</md-dialog>',

                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    parent: angular.element(document.body)
                });
                $mdDialog.show(confirm).then(function() {
                });
            };

            //try to use templateURL: "components/participate-dialog/participate-dialog.template.html",


            $scope.showDetails = function (title, ev) {
                $location.path('/study-details').search({'study': title});
            };

            $scope.showCreateStudyPrompt = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.prompt()
                    .title('Wie ist der Name deiner Studie?')
                    .textContent('Zum Beispiel: Fahrverhalten nach erhöhtem Milchkonsum')
                    .placeholder('Name deiner Studie')
                    .ariaLabel('Studienname')
                    .initialValue('')
                    .targetEvent(ev)
                    .ok('Studie erstellen')
                    .cancel('Abbrechen');

                $mdDialog.show(confirm).then(function(result) {
                    $location.path('/create-study').search({'study': result})
                }, function() {
                    console.log('Come on dude, it would have been a great study!');
                });
            };

        }])
    .directive('studyList', function () {
        return {
            templateUrl: 'components/study-list/study-list.template.html'
        }
    });

