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


            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            $scope.datesGroupedByDay = [];
            $scope.currentStudy = {};

            $scope.showParticipationDialog = function(study) {
                $scope.currentStudy = study;
                $scope.dates = StudyDate.find(
                    {
                        filter: {
                            where: {
                                studyId: study.id
                            }
                        }
                    }, function() {

                        $scope.datesGroupedByDay = [];

                        var days = [];
                        var day;
                        var lastDay;

                        var tempDates = $scope.dates;
                        tempDates.reverse();
                        tempDates.forEach(function(date) {
                            day = $filter('date')(date.startDate, "shortDate");
                            if(lastDay == undefined) {
                                lastDay = day;
                            }
                            if(day != lastDay) {
                                $scope.datesGroupedByDay.push(days);
                                days = [];
                                days.push(date);
                                lastDay = day;
                            } else {
                                days.push(date);
                            }
                        });
                        $scope.datesGroupedByDay.push(days);
                    });


                $scope.calculateEndDate = function(startDate) {
                    return startDate;
                };

                var confirm = $mdDialog.confirm({
                    controller: "ParticipateDialogController",
                    template: '<participate-dialog></participate-dialog>',
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    parent: angular.element(document.body)
                });
                $mdDialog.show(confirm).then(function() {

                });
            };



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

