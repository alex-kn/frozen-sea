angular
    .module('myStudies', ['ngRoute', 'ngMaterial'])
    .controller('MyStudiesController', ['$scope', 'Study', 'Participation', 'Subuser', 'LoopBackAuth', '$translate','$location',
        function ($scope, Study, Participation, Subuser, LoopBackAuth, $translate, $location) {

            $scope.title = 'Meine Studien';
            $scope.myStudies = [];

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
                });
            });

            $scope.showDetails = function (study, ev) {
                $location.path('/study-details').search({'study': study});
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
