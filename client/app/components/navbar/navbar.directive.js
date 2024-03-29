/**
 * Created by jan on 15.12.16.
 */

angular.module('navBarDirective', [])
    .controller('NavigationController', ['$scope', '$location', '$route', '$translate', '$mdSidenav', '$log','$rootScope','$window','Subuser',
        function ($scope, $location, $route, $translate, $mdSidenav, $log, $rootScope, $window, Subuser) {

            $scope.toggleSidenav = buildToggler('left');

            $scope.changeLanguage = function(langKey) {
                $translate.use(langKey);
            };

            var language = 'de';
            $scope.toggleLanguage = function() {
                language === 'de' ? language = 'en' : language = 'de';
                $translate.use(language);
            };

            $scope.$route = $route;

            $scope.openMenu = function ($mdOpenMenu, event) {
                $mdOpenMenu(event);
            };

            $scope.goToEditProfile = function (){
                $location.path('/edit-profile');
            };

            $scope.logout = function () {
                console.log('NavigationController: logout');
                return Subuser.logout().$promise.then(function() {
                    $rootScope.currentUser = null;
                    $window.location.reload();
                });
            };

            function buildToggler(navID) {
                return function() {
                    // Component lookup should always be available since we are not using `ng-if`
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                };
            }


    }])
    .controller('SidenavController', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    })
    .directive('navBar', function () {
        return {
            templateUrl: 'components/navbar/navbar.template.html'
        }
    });
