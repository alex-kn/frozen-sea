angular
    .module('myStudies', ['ngRoute', 'ngMaterial'])
    .controller('MyStudiesController', ['$scope', 'Study', 'Participation', 'Subuser', 'LoopBackAuth', '$filter', '$translate','$location', 'StudyHighlightService', 'ByRoleService',
        function ($scope, Study, Participation, Subuser, LoopBackAuth, $filter, $translate, $location, StudyHighlightService, ByRoleService) {

            $scope.title = $filter('translate')('MY_STUDIES.TITLE');
            $scope.isAdvisor = false;
            $scope.myStudies = [];
            $scope.createdStudies = [];
            $scope.advisedStudies = [];
            $scope.studyIsLoading = true;

            $scope.toggleFilterOnMobile = function(key) {
                if (key === 'search') {
                    $scope.search = true;
                }
            };



            //myStudies
            Participation.find({
                filter: {
                    where: {
                        participantId: LoopBackAuth.currentUserId
                    }
                }
            }, function(userParticipations){

                var studyIds = [];
                userParticipations.map(function(participation) {
                    studyIds.push(participation.studyId);
                });

                studyIds = removeDuplicates(studyIds);
                Study.find({filter: {
                    where: {
                        id: {
                            inq: studyIds
                        }
                    }
                }}, function(studies){
                    $scope.myStudies=studies;
                    StudyHighlightService.highlightStudy($scope.myStudies, LoopBackAuth.currentUserId).then(function(studies) {
                        $scope.myStudies = studies;
                    });
                    $scope.studyIsLoading = false;
                });
            });


            //createdStudies
            Study.find({
                filter: {
                    where: {
                        ownerId: LoopBackAuth.currentUserId
                    }
                }
            }, function(studies) {
                $scope.createdStudies = studies;
                StudyHighlightService.highlightStudy($scope.createdStudies, LoopBackAuth.currentUserId).then(function(studies) {
                    $scope.createdStudies = studies;
                });
            });


            //advisedStudies
            Study.find({
                filter: {
                    where: {
                        advisorId: LoopBackAuth.currentUserId
                    }
                }
            }, function(studies) {
                $scope.advisedStudies = studies;
                StudyHighlightService.highlightStudy($scope.advisedStudies, LoopBackAuth.currentUserId).then(function(studies) {
                    $scope.advisedStudies = studies;
                });
                $scope.thereAreAdvisedStudies = $scope.advisedStudies.length > 0;

            });

            ByRoleService.getUsersByRole("advisor").then(function(advisors) {
                advisors.forEach(function(advisor) {
                    if (LoopBackAuth.currentUserId == advisor.id) {
                        $scope.isAdvisor = true;
                    }
                })
            });


            $scope.showDetails = function (study, ev) {
                $location.path('/study-details-view').search({'study': study.id});
            };

            $scope.toggle = function() {
                $scope.show = !$scope.show;
            };

            function removeDuplicates(array) {
                var new_array = [];
                var lookup  = {};

                for (var i in array) {
                    lookup[array[i]] = array[i];
                }
                for (i in lookup) {
                    new_array.push(lookup[i]);
                }
                return new_array;
            }

        }]);
