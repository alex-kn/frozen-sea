angular
    .module('myStudies', ['ngRoute', 'ngMaterial'])
    .controller('MyStudiesController', ['$scope', 'Study', 'Participation', 'Subuser', 'LoopBackAuth', '$filter', '$translate','$location', 'StudyHighlightService',
        function ($scope, Study, Participation, Subuser, LoopBackAuth, $filter, $translate, $location, StudyHighlightService) {

            $scope.title = $filter('translate')('MY_STUDIES.TITLE');
            $scope.myStudies = [];
            $scope.createdStudies = [];
            $scope.advisedStudies = []; //TODO
            $scope.studyIsLoading = true;


            //myStudies
            Participation.find({
                filter: {
                    where: {
                        participantId: LoopBackAuth.currentUserId
                    }
                }
            }, function(userParticipations){
                Study.find(function(allStudies){
                    for(var i = 0; i < userParticipations.length; i++) {
                        for (var j = 0; j < allStudies.length; j++) {
                            if (allStudies[j].id == userParticipations[i].studyId) {
                                $scope.myStudies.push(allStudies[j]);
                                $scope.myStudies = removeDuplicates($scope.myStudies, 'id');
                            }
                        }
                    }

                    StudyHighlightService.highlightStudy($scope.myStudies, LoopBackAuth.currentUserId);
                    $scope.studyIsLoading = false;
                });
            });


            //createdSTudies
            Study.find({
                filter: {
                    where: {
                        ownerId: LoopBackAuth.currentUserId
                    }
                }
            }, function(studies) {
                $scope.createdStudies = studies;
                StudyHighlightService.highlightStudy($scope.createdStudies, LoopBackAuth.currentUserId);
            });


            $scope.showDetails = function (study, ev) {
                $location.path('/study-details-view').search({'study': study.id});
            };

            $scope.toggle = function() {
                $scope.show = !$scope.show;
            };

            function removeDuplicates(array, property) {
                var new_array = [];
                var lookup  = {};

                for (var i in array) {
                    lookup[array[i][property]] = array[i];
                }
                for (i in lookup) {
                    new_array.push(lookup[i]);
                }
                return new_array;
            }

        }]);
