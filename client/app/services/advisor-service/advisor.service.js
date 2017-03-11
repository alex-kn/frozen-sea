/**
 * Created by jan on 11.03.17.
 */

angular
    .module('AdvisorService', [])
    .factory('AdvisorService', ['$http', function ($http) {

        function getAdvisorList() {
            return $http.get('resc/files/advisor-list.json');
        }

        //TODO addAdvisor
        function addAdvisor(advisor) {

        }

        return {
            getAdvisorList: getAdvisorList,
            addAdvisor: addAdvisor
        }



    }]);

