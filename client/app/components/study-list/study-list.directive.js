/**
 * Created by Alexander on 15-Dec-16.
 */

angular
    .module('studyListDirective', [])
    .controller('StudyListController', ['$scope', 'Study', '$mdDialog', '$location', 'Subuser', 'LoopBackAuth', '$filter',
        function ($scope, Study, $mdDialog, $location, Subuser, LoopBackAuth, $filter) {

        $scope.title = 'Studien';



        $scope.studiesTemp = Study.find(
            function(list) { /* success */ //TODO: where end date not in the past
                filter()
            },
            function(errorResponse) { /* error */}
        );

        function filter() {
            Subuser.preferences({"id": LoopBackAuth.currentUserId}, function (response) {
                $scope.preferences = response;
                $scope.studies = $filter('filterStudies')($scope.studiesTemp, $scope.preferences)
            });
        }

        $scope.showPrompt = function(ev) {
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
                $scope.status = 'You didn\'t name your dog.';
            });
        };

    }])
    .directive('studyList', function () {
        return {
            templateUrl: 'components/study-list/study-list.template.html'
        }
    });

