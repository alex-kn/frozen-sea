/**
 * Created by jan on 15.12.16.
 */

'use strict';

angular
    .module('userStudy')
    .config(['$locationProvider', '$routeProvider', 'LoopBackResourceProvider', '$mdThemingProvider', '$translateProvider', '$qProvider','$mdDateLocaleProvider',
        function ($locationProvider, $routeProvider, LoopBackResourceProvider, $mdThemingProvider, $translateProvider, $qProvider,$mdDateLocaleProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.when('/home', {
                templateUrl: 'views/home/home.template.html',
                activeTab: 'home'
            }).when('/login', {
                templateUrl: 'views/login/login.template.html',
                controller: 'LoginController'
            }).when('/login/:param1', {
                templateUrl: 'views/login/login.template.html',
                controller: 'LoginController'
            }).when('/reset-password-request', {
                templateUrl: 'views/reset-password-request/reset-password-request.template.html',
                controller: 'ResetPasswordRequestController'
            }).when('/reset-password/:token/:id', {
                templateUrl: 'views/reset-password/reset-password.template.html',
                controller: 'ResetPasswordController'
            }).when('/register', {
                templateUrl: 'views/register/register.template.html'
            }).when('/archive', {
                templateUrl: 'views/archive/archive.template.html',
                activeTab: 'archive'
            }).when('/create-study', {
                templateUrl: 'views/create-study/create-study.template.html'
            }).when('/user-preferences', {
                templateUrl: 'views/user-preferences/user-preferences.template.html',
                activeTab: 'user-preferences'
            }).when('/study-details-view', {
                templateUrl: 'views/study-details-view/study-details-view.template.html'
            }).when('/study-details-edit', {
                templateUrl: 'views/study-details-edit/study-details-edit.template.html'
            }).when('/my-studies', {
                templateUrl: 'views/my-studies/my-studies.template.html',
                controller: 'MyStudiesController',
                activeTab: 'my-studies'
            }).when('/edit-profile', {
                templateUrl: 'views/edit-profile/edit-profile.template.html',
                controller: 'editProfileController'
            }).when('/admin-dashboard', {
                templateUrl: 'views/admin-dashboard/admin-dashboard.template.html',
                controller: 'AdminDashboardController',
                activeTab: 'admin-dashboard'

            }).otherwise({redirectTo: '/login'});

            //Disable console.log
            console.log = function(){};

            // Use a custom auth header instead of the default 'Authorization'
            LoopBackResourceProvider.setAuthHeader('X-Access-Token');

            // Change the URL where to access the LoopBack REST API server
            LoopBackResourceProvider.setUrlBase('http://localhost:3000/api'); //<---- change path here on new deployment

            $qProvider.errorOnUnhandledRejections(false);

            /**
             * Configure material design theme -> @url https://material.io/guidelines/style/color.html
             * For more infos on Angular Material -> @url https://material.angularjs.org/latest/
             */


            var whiteMap = $mdThemingProvider.extendPalette('grey', {
                '50': '#ffffff'
            });

            $mdThemingProvider.definePalette('white', whiteMap);


            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey', {
                    'default': '500',
                    'hue-1': '900',
                    'hue-2': '300'
                })
                .accentPalette('orange')
                .backgroundPalette('white', {
                    'default': '50'
                });

            /** Date and language configuration
             *  uses moment.js and ng-translate
             */
            $translateProvider.useStaticFilesLoader({
                files: [{
                    prefix: './resc/localization/locale-',
                    suffix: '.json'
                }]
            });
            $translateProvider.preferredLanguage('de');
            moment.locale('de'); // check moment.js for locals and date formats
            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('L');
            };
            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'L', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };
            // Enable escaping of HTML
            $translateProvider.useSanitizeValueStrategy('escape');
        }])
    .run(['$rootScope', '$location', 'LoopBackAuth', 'ByRoleService',
        function ($rootScope, $location, LoopBackAuth, ByRoleService) {

            var publicRoutes = ['/register', '/login', '/reset-password/', '/reset-password-request'];


            /**
             * Check if route is public route. Define public routes in publicRoutes array
             *
             * @param   route   contains the route to check (String)
             * @return          if route is in publicRoutes array it returns the route (String), otherwise undefined
             */

            var isPublicRoute = function (route) {
                return publicRoutes.find(function (publicRoute) {
                    return route.startsWith(publicRoute);
                });
            };

            $rootScope.isAdmin = false;


            $rootScope.$on('$routeChangeStart', function (event, next, current) {

                if (LoopBackAuth.currentUserId != null){
                    ByRoleService.getUsersByRole("admin").then(function (res) {

                        res.forEach(function (user) {
                            if (user.id == LoopBackAuth.currentUserId) {
                                $rootScope.isAdmin = true;
                            }
                        });

                    });
            }

                // No public route && not logged in: redirect to /login
                if (!isPublicRoute($location.url()) && !LoopBackAuth.accessTokenId) {
                    $location.path('/login');
                    console.log('not auth: redirect to /login')
                }

                // Route '/' && logged in: redirect to home
                if (($location.url() == '/' || $location.url() == '/login') && LoopBackAuth.accessTokenId) {
                    $location.path('/home');
                    console.log('route / and logged in: redirect to /home');
                }

                // Route '/admin-dashboard' && no admin: redirect to home
                if (($location.url() == '/admin-dashboard') && !$rootScope.isAdmin) {
                    $location.path('/home');
                }

                //console.log('accesToken:' + LoopBackAuth.accessTokenId);

                /* Tests
                 console.log('accesToken:' + LoopBackAuth.accessTokenId);
                 console.log('if..:' + (isPublicRoute($location.url()) && LoopBackAuth.accessTokenId));
                 console.log('if.!:' + (isPublicRoute($location.url()) && !LoopBackAuth.accessTokenId));
                 console.log('if!.:' + (!isPublicRoute($location.url()) && LoopBackAuth.accessTokenId));
                 console.log('if!!:' + (!isPublicRoute($location.url()) && !LoopBackAuth.accessTokenId));
                 console.log('notaccesToken:' + !LoopBackAuth.accessTokenId);
                 console.log('event:' + event);
                 console.log('next:' + next);
                 console.log('current:' + current);
                 */

            });


        }]);
