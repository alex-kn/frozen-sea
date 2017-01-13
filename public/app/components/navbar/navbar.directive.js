/**
 * Created by jan on 15.12.16.
 */

angular.module('navBarDirective', [])
    .controller('NavigationController', ['$scope','AuthService', function($scope, AuthService) {
        $scope.logout = function () {
            console.log('NavigationController: logout');
            AuthService.logout();
        };

    }])
    .directive('navBar', function() {
        return {
            templateUrl: 'components/navbar/navbar.template.html'
        }
    });
