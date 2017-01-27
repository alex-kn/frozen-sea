angular
    .module('myStudies', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/my-studies', {
            templateUrl: 'views/my-studies/my-studies.template.html',
            controller: 'MyStudiesController'
        });
    }])
    .controller('MyStudiesController', ['$scope', 'Study','Study-date', '$mdDialog','Participation', '$location', 'Subuser', 'LoopBackAuth',
        function ($scope, Study, StudyDate, $mdDialog, Participation, $location, Subuser, LoopBackAuth) {

            $scope.title = 'Meine Studien';
            $scope.studies = Participation.find({
                filter: {
                    where: {
                        subuserId: LoopBackAuth.currentUserId
                    }
                }
            });

            console.log($scope.studies);







        }]);

