/**
 * Created by Jan on 02.03.2017.
 */

angular
    .module('ToastService', [])
    .factory('ToastService', ['$mdToast', function($mdToast) {

        var toastText;
        var studyCreated = false;
        var participateInStudy = false;

        // check the origin to display the respective toast text
        function setToastText (studyTitle, origin) {

            if(origin === 'create') {

                studyCreated = true;
                toastText = 'Deine Studie ' + studyTitle + ' wurde erstellt.'

            } else if(origin === 'participate') {

                participateInStudy = true;
                toastText = 'Du nimmst an der Studie ' + studyTitle + ' teil.'
            }

        }

        function displayToast() {

            if(studyCreated || participateInStudy) {

                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: [function() {
                        this.toastText = toastText;
                    }],
                    controllerAs: 'toast',
                    templateUrl: 'services/toast-service/toast-service.template.html'
                });

                studyCreated = false;
                participateInStudy = false;

            }
        }

        return {
            setToastText: setToastText,
            displayToast: displayToast
        }
    }]);
