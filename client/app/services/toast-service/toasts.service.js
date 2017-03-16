/**
 * Created by Jan on 02.03.2017.
 */

angular
    .module('ToastService', [])
    .factory('ToastService', ['$mdToast', '$filter', '$translate', function($mdToast, $filter, $translate) {

        var toastText;
        var toastToDisplay = false;

        // check the origin to display the respective toast text
        function setToastText (_toastText) {
            toastText = _toastText;
            toastToDisplay = true;
        }

        function displayToast() {

            if(toastToDisplay) {

                $mdToast.show({
                    hideDelay: 300000,
                    position: 'top right',
                    controller: [function() {
                        this.toastText = $filter('translate')(toastText);
                    }],
                    controllerAs: 'toast',
                    templateUrl: 'services/toast-service/toast-service.template.html'
                });

                toastToDisplay = false;

            }
        }

        return {
            setToastText: setToastText,
            displayToast: displayToast
        }
    }]);
