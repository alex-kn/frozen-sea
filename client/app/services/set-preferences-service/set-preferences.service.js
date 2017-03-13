/**
 * Created by jan on 13.03.17.
 */

/**
 * Created by Jan on 02.03.2017.
 */

angular
    .module('SetPreferencesService', [])
    .factory('SetPreferencesService', ['$location', '$filter', '$mdDialog', '$translate', function($location, $filter, $mdDialog, $translate) {

        return {
            showPreferencesDialog: function() {
                var confirm = $mdDialog.confirm()
                    .title($filter('translate')('PREFERENCES.TITLE'))
                    .textContent($filter('translate')('PREFERENCES.DESCRIPTION'))
                    .ariaLabel($filter('translate')('PREFERENCES.ARIA-LABEL'))
                    .ok($filter('translate')('PREFERENCES.OK'))
                    .cancel($filter('translate')('PREFERENCES.CANCEL'));

                $mdDialog.show(confirm).then(function() {
                    $location.path('/user-preferences');
                }, function() {
                    console.log('We need this :(');
                });
            }
        }
    }]);
