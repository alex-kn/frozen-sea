/**
 * Created by Alexander on 15-Dec-16.
 */

angular
    .module('studyListDirective', [])
    .controller('StudyListController', ['$scope', 'Study', '$mdDialog', '$location', function ($scope, Study, $mdDialog, $location) {

        $scope.title = 'Studien';

        $scope.studies = Study.find(
            function (list) { /* success */
            },
            function (errorResponse) { /* error */
            }
        );

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

