/**
 * Created by Alexander on 15-Dec-16.
 */

angular
    .module('studyListDirective', ['participateDialogDirective'])
    .controller('StudyListController', ['$scope', '$routeParams', 'Participation', 'Study', 'StudyDate', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$translate', '$filter', 'ToastService', 'SetPreferencesService',
        function ($scope, $routeParams, Participation, Study, StudyDate, $mdDialog, $location, Subuser, LoopBackAuth, $translate, $filter, ToastService, SetPreferencesService) {


            $scope.show = false;
            $scope.studyIsLoading = true;
            $scope.studyIsReLoading = false;
            $scope.studies = [];
            $scope.show_too_old = true;
            $scope.show_non_matches = true;
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

            $scope.reloadStudies = function() {
                $scope.studyIsReLoading = true;
                $scope.loadStudies();
            };

            $scope.loadStudies = function() {
                $scope.myFilter = {};
                if($scope.show_too_old) { //load all studies that are not finished yet
                    $scope.myFilter = {filter: {where: {endDate:  {gte: new Date()}}}};
                }
                $scope.studiesTemp = Study.find($scope.myFilter,
                    function(list) {
                        compareStudyDetailsWithUserPreferences();
                    }
                );
            };

            $scope.loadStudies(); //initial load


            $scope.refilter = function() {
                if ($scope.show_non_matches) {
                    //filter all studies that don't match user profile
                    $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences);
                } else {
                    $scope.studies = $scope.studiesTemp;
                }
            };

            $scope.toggle = function() {
                $scope.show = !$scope.show;
            };


            function compareStudyDetailsWithUserPreferences() {
                Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
                    $scope.studyIsLoading = false;
                    $scope.studyIsReLoading = false;
                    $scope.preferences = response;
                    //filter all studies that don't match user profile
                    $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences);

                        //highlight studies of special interest
                        $scope.studies.forEach(function (study) {
                            study.isThisMyOwnStudy = study.ownerId === LoopBackAuth.currentUserId;
                            study.isFinished = new Date(study.endDate) < new Date();


                            study.isApproved = true; //TODO
                            study.isThisAStudyISupervise = false; //TODO
                            study.isThisAStudyISuperviseAndNeedsApproval = false; //TODO
                            study.isThisAStudyIParticipateInAndIFinishedIt = false; //TODO
                            study.isThisAStudyIParticipateInAndIDIDNTFinishedIt = false; //TODO


                            Participation.count({
                                where: {
                                    participantId: LoopBackAuth.currentUserId,
                                    studyId: study.id,
                                    status: "pending"
                                }
                            }, function (response) {
                                study.isThisAStudyIParticipateInAndIAmNotApproved = response.count > 0;
                            });

                            Participation.count({
                                where: {
                                    participantId: LoopBackAuth.currentUserId,
                                    studyId: study.id,
                                    status: "confirmed"
                                }
                            }, function (response) {
                                study.isThisAStudyIParticipateInAndIAmApproved = response.count > 0
                            });
                        })


                },function (error){
                    if(error.status == 404){

                        SetPreferencesService.showPreferencesDialog();
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
                    .title($filter('translate')('STUDY_LIST.WHAT_NAME'))
                    .textContent($filter('translate')('STUDY_LIST.EXAMPLE'))
                    .placeholder($filter('translate')('STUDY_LIST.STUDY_NAME_2'))
                    .ariaLabel($filter('translate')('STUDY_LIST.STUDY_NAME'))
                    .initialValue('')
                    .targetEvent(ev)
                    .ok($filter('translate')('STUDY_LIST.CREATE'))
                    .cancel($filter('translate')('STUDY_LIST.CANCEL'));

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

