'use strict';

angular.module('adminDashboard', ['ngRoute', 'ngMaterial'])
    .controller('AdminDashboardController', ['$scope', 'Subuser', '$route', '$http', '$filter', '$translate', 'ToastService', 'LoopBackAuth', 'Participation', 'ByRoleService','$mdDialog',
        function ($scope, Subuser, $route, $http, $filter, $translate, ToastService, LoopBackAuth, Participation, ByRoleService, $mdDialog) {
            $scope.title = 'Profil bearbeiten';
            $scope.input = {};
            $scope.error = {};
            $scope.users = {};
            $scope.admins = [];
            $scope.advisors = [];
            var confirmUser = "";

            createUserList();

            $scope.onChangeAdmin = function (user) {
                if (!user.isAdmin) {
                    revokeRole('admin', user)
                }
                else {
                    setRole('admin', user);
                }
            };

            $scope.onChangeAdvisor = function (user) {
                if (!user.isAdvisor) {
                    revokeRole('advisor', user)
                }
                else {
                    setRole('advisor', user);
                }
            };


            $scope.deleteConfirm = function (ev, user) {
                confirmUser = user;
                var confirm = $mdDialog.confirm()
                    .title($filter('translate')('ADMIN_DASHBOARD.CONFIRM_DELETE_TITLE'))
                    .textContent($filter('translate')('ADMIN_DASHBOARD.CONFIRM_DELETE_TEXT'))
                    .ariaLabel('Delete user')
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel($filter('translate')('ADMIN_DASHBOARD.CONFIRM_DELETE_ABORT'));

                $mdDialog.show(confirm).then(function () {
                    deleteUser(confirmUser);
                }, function () {
                });
            };


            function createUserList() {
                Subuser.find({}, function (value, responseHeaders) {

                    ByRoleService.getUsersByRole("admin").then(function (res) {
                        // if scope.admins not needed - delete
                        $scope.admins = res;
                        console.log($scope.admins);

                        for (var i = 0; i < $scope.admins.length; i++) {

                            for (var j = 0; j < value.length; j++) {
                                if(value[j].id == LoopBackAuth.currentUserId) {
                                    value[j].current = true;
                                }

                                if ($scope.admins[i].id == value[j].id) {
                                    value[j].isAdmin = true;
                                    console.log('>admin:', value[j]);

                                }
                            }
                        }
                    });
                    ByRoleService.getUsersByRole("advisor").then(function (res) {
                        // if scope.advisors not needed - delete
                        $scope.advisors = res;
                        console.log($scope.advisors);

                        for (var i = 0; i < $scope.advisors.length; i++) {
                            for (var j = 0; j < value.length; j++) {
                                if ($scope.advisors[i].id == value[j].id) {
                                    value[j].isAdvisor = true;
                                    console.log('>advisor:', value[j]);

                                }
                            }
                        }
                    });
                    $scope.users = value;
                }, function (err) {
                    console.log(err);
                });
            }


            function revokeRole(role, user) {
                var data = {
                    id: LoopBackAuth.currentUserId,
                    role: role,
                    userId: user.id
                };

                $http.post('/api/Subusers/' + data.id + '/revokeRole', data).then(function (response) {
                    console.log(response);
                    if (role == 'admin' && !user.deletion) {
                        ToastService.setToastText($filter('translate')('ADMIN_DASHBOARD.TOAST_ADMIN_REVOKE'));
                        ToastService.displayToast();
                    }
                    if (role == 'advisor' && !user.deletion) {
                        ToastService.setToastText($filter('translate')('ADMIN_DASHBOARD.TOAST_ADVISOR_REVOKE'));
                        ToastService.displayToast();
                    }
                    return response;

                }, function (err) {
                    console.log(err);
                    if (role == 'admin') {
                        user.isAdmin = true;
                    }
                    if (role == 'advisor') {
                        user.isAdvisor = true;
                    }

                    return err;
                });
            }

            function setRole(role, user) {
                var roleId = '';
                if (role == 'admin') {
                    roleId = '58bc42e50435dc1f661f62ec'
                }
                if (role == 'advisor') {
                    roleId = '58bc4281b4660d0d66daeb90'
                }
                var data = {
                    id: LoopBackAuth.currentUserId,
                    role: roleId,
                    userId: user.id
                };

                $http.post('/api/Subusers/' + data.id + '/setRole', data).then(function (response) {
                    console.log(response);
                    if (role == 'admin') {
                        ToastService.setToastText($filter('translate')('ADMIN_DASHBOARD.TOAST_ADMIN'));
                        //ToastService.setToastText($filter('translate')('LOGIN.VERIFICATION_SUCCESS'));
                        ToastService.displayToast();
                    }
                    if (role == 'advisor') {
                        ToastService.setToastText($filter('translate')('ADMIN_DASHBOARD.TOAST_ADVISOR'));
                        ToastService.displayToast();
                    }

                    return response;

                }, function (err) {
                    console.log(err);
                    if (role == 'admin') {
                        user.isAdmin = false;
                    }
                    if (role == 'advisor') {
                        user.isAdvisor = false;
                    }

                    return err;
                });
            }

            function deleteUser(user) {
                user.deletion = true;
                revokeRole('admin', user);
                revokeRole('advisor', user);
                Subuser.deleteById({id: user.id}, function (value, responseHeaders) {
                    console.log(value);
                    for(var i=0; i<$scope.users.length; i++){
                        if($scope.users[i].id == user.id){
                            $scope.users.splice(i, 1);
                            break;
                        }
                    }

                    ToastService.setToastText($filter('translate')('ADMIN_DASHBOARD.TOAST_DELETE'));
                    ToastService.displayToast();
                }, function (err) {
                    console.log(err);

                })
            }

        }]);
