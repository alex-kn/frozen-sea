/**
 * Created by Alexander on 15-Dec-16.
 */

angular
    .module('studyListDirective', ['participateDialogDirective'])
    .controller('StudyListController', ['$scope', '$routeParams', 'Participation', 'Study', 'StudyDate', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$translate', '$filter', 'ToastService',
        function ($scope, $routeParams, Participation, Study, StudyDate, $mdDialog, $location, Subuser, LoopBackAuth, $translate, $filter, ToastService) {



            $scope.sort_by =  "ends_soon"; //default sort value
            $scope.dynamicOrderFunction = function() {
                if ($scope.sort_by == "newest") {
                    $scope.studies.sort(function(a,b) {
                        return new Date(a.startDate) > new Date(b.startDate)
                    })
                }
                if ($scope.sort_by == "ends_soon") {
                    $scope.studies.sort(function(a,b) {
                        return new Date(a.endDate) > new Date(b.endDate)
                    })
                }
            };



            //load all studies that are not finished yet
            $scope.studiesTemp = Study.find({filter: {where: {endDate:  {gte: new Date()}}}},
                function(list) {
                    compareStudyDetailsWithUserPreferences();
                }
            );


            function compareStudyDetailsWithUserPreferences() {
                Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
                    $scope.preferences = response;

                    //filter all studies that don't match user profile
                    $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences);

                    //highlight studies of special interest
                    $scope.studies.forEach(function(study) {
                        study.isThisMyOwnStudy = study.ownerId === LoopBackAuth.currentUserId;

                        //TODO: study.isThisAStudyISupervise = $scope.thisStudy.advisorId === LoopBackAuth.currentUserId;

                        Participation.count({where: {participantId: LoopBackAuth.currentUserId, studyId: study.id, status:"pending"}}, function (response) {
                            study.isThisAStudyIParticipateInAndIAmNotApproved = response.count > 0;
                            console.log("doing it again")
                        });

                        Participation.count({where: {participantId: LoopBackAuth.currentUserId, studyId: study.id, status:"confirmed"}}, function (response) {
                            study.isThisAStudyIParticipateInAndIAmApproved = response.count > 0
                        });
                    })

                },function (error){
                    if(error.status == 404){

                        //if no preference object can be found, create it
                        Subuser.preferences
                            .create({id: LoopBackAuth.currentUserId}, {})
                            .$promise
                            .then(function (response) {
                                compareWithUserPreferences(); //obacht!
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

                        tempDates.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(b.startDate) - new Date(a.startDate);
                        });

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


                var confirm = $mdDialog.confirm({
                    controller: "ParticipateDialogController",
                    template: '<participate-dialog class="container"></participate-dialog>',
                    scope: $scope,
                    preserveScope: true,
                    parent: angular.element(document.body)
                });
                $mdDialog.show(confirm).then(function() {
                    $scope.currentStudy = {};
                    $scope.datesGroupedByDay = [];
                });
            };


            $scope.displayToast = function() {
                ToastService.displayToast();
            };



            $scope.showDetails = function (study, ev) {
                $location.path('/study-details-view').search({'study': study.id});
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

