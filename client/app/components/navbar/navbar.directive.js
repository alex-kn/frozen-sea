/**
 * Created by jan on 15.12.16.
 */

angular.module('navBarDirective', [])
    .controller('NavigationController', ['$scope', 'AuthService', '$location', '$route', '$translate',
        function ($scope, AuthService, $location, $route, $translate) {

        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
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
            AuthService.logout();
        };

    }])
    .directive('navBar', function () {
        return {
            templateUrl: 'components/navbar/navbar.template.html'
        }
    });
