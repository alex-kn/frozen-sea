/**
 * Created by jan on 15.12.16.
 */

'use strict';

angular.module('archive', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/archive', {
            templateUrl: 'views/archive/archive.template.html',
            controller: 'ArchiveController'
        });
    }])

    .controller('ArchiveController', ['$scope', 'Subuser', 'Study', 'LoopBackAuth',
        function($scope, Subuser, Study, LoopBackAuth) {

    }]);
