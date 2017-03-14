
'use strict';

angular.module('adminDashboard', ['ngRoute', 'ngMaterial'])
    .controller('AdminDashboardController', ['$scope', 'Subuser','$route', '$filter', '$translate','ToastService','LoopBackAuth','Participation',
        function ($scope, Subuser, $route, $filter, $translate,ToastService, LoopBackAuth, Participation) {
            $scope.title = 'Profil bearbeiten';
            $scope.input = {};
            $scope.error = {};
            $scope.users = {};

            Subuser.find({}, function(value,responseHeaders){
                $scope.users = value;
                console.log(value);
            }, function(err){
                console.log(err);
            });


        }]);
