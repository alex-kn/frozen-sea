/**
 * Created by Alexander on 15-Dec-16.
 */

angular
    .module('studyListDirective', ['participateDialogDirective'])
    .controller('StudyListController', ['$scope', '$routeParams', 'Participation', 'Study', 'StudyDate', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$translate', '$filter', 'ToastService', 'SetPreferencesService', 'StudyHighlightService', 'ByRoleService',
        function ($scope, $routeParams, Participation, Study, StudyDate, $mdDialog, $location, Subuser, LoopBackAuth, $translate, $filter, ToastService, SetPreferencesService, StudyHighlightService, ByRoleService) {

            $scope.initialize = function() {

                $scope.isAdvisor = false;
                $scope.show = false;
                $scope.studyIsLoading = true;
                $scope.studyIsReLoading = false;
                $scope.studies = [];
                $scope.show_too_old = true;
                $scope.show_non_matches = true;
                $scope.sort_by =  "ends_soon"; //default sort value
                $scope.searchGtXs = false;
                $scope.search = false;
                $scope.filter = false;
                $scope.sort = false;

                // Check if user is advisor to display additional filter functionality
                ByRoleService.getUsersByRole("advisor").then(function(advisors) {
                    advisors.forEach(function(advisor) {
                        if (LoopBackAuth.currentUserId == advisor.id) {
                            $scope.isAdvisor = true;
                        }
                    })
                });
                $scope.loadStudies(); //initial load
            };

            /**
             * Filter and search study list
             */
            $scope.toggleFilterOnMobile = function(key) {
                if (key === 'search') {
                    $scope.search = true;
                    $scope.filter = false;
                    $scope.sort = false;
                } else if (key === 'filter') {
                    $scope.search = false;
                    $scope.filter = true;
                    $scope.sort = false;
                } else if (key === 'sort') {
                    $scope.search = false;
                    $scope.filter = false;
                    $scope.sort = true;
                }
            };
            $scope.dynamicOrderFunction = function() {
                if ($scope.sort_by == 'newest') {
                    $scope.studies.sort(function(a,b) {
                        return new Date(a.creationDate) > new Date(b.creationDate)
                    })
                }
                if ($scope.sort_by == 'ends_soon') {
                    $scope.studies.sort(function(a,b) {
                        return new Date(a.endDate) > new Date(b.endDate)
                    })
                }
            };

            /**
             * Load and reload studies
             */
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
            $scope.refilter = function() {
                if ($scope.show_non_matches) {
                    //filter all studies that don't match user profile
                    $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences);
                } else {
                    $scope.studies = $scope.studiesTemp;
                }

                StudyHighlightService.highlightStudy($scope.studies, LoopBackAuth.currentUserId).then(function(studies) {
                    $scope.studies = studies;
                });
            };

            /**
             * Filter study list to match user preferences
             */
            function compareStudyDetailsWithUserPreferences() {
                Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
                    $scope.studyIsLoading = false;
                    $scope.studyIsReLoading = false;
                    $scope.preferences = response;
                    //filter all studies that don't match user profile
                    $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences);

                    StudyHighlightService.highlightStudy($scope.studies, LoopBackAuth.currentUserId);

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

            /**
             * Handle user interaction
             */
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

