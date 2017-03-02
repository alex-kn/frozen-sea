/**
 * Created by jan on 15.12.16.
 */

'use strict';

angular.module('home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.template.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', ['$scope', '$window', '$routeParams', 'Subuser', 'Study', 'LoopBackAuth',
        function($scope, $window, $routeParams, Subuser, Study, LoopBackAuth) {

    }]);
