angular
    .module('myStudies', ['ngRoute', 'ngMaterial'])
    .controller('MyStudiesController', ['$scope', 'Study', 'Participation', 'Subuser', 'LoopBackAuth',
        function ($scope, Study, Participation, Subuser, LoopBackAuth) {

            $scope.title = 'Meine Studien';
            $scope.myStudies = [];

            Participation.find({
                filter: {
                    where: {
                        subuserId: LoopBackAuth.currentUserId
                    }
                }
            }, function(userParticipations){
                Study.find(function(allStudies){
                    for(var i = 0; i < userParticipations.length; i++) {
                        for (var j = 0; j < allStudies.length; j++) {
                            if (allStudies[j].id == userParticipations[i].studyId) {
                                $scope.myStudies.push(allStudies[j]);
                            }
                        }
                    }
                });


                /* Query for every StudyId

                 var myStudies = [];

                 for(i = 0; i < result.length; i++){
                 $scope.studies = Study.find({
                 filter: {
                 where: {
                 id: result[i].studyId
                 }
                 }
                 }, function(result){
                 console.log(result);
                 var resultLength = result.length;
                 for(j = 0; j < resultLength; j++){

                 myStudies.push(result[j]);
                 myStudies = myStudies.filter(function( item, index, inputArray ) {
                 return inputArray.indexOf(item) == index;
                 });

                 $scope.studies = myStudies;

                 }
                 });
                 }
                 */

            });

        }]);
