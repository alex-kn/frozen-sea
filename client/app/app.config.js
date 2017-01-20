/**
 * Created by jan on 15.12.16.
 */

'use strict';

angular
    .module('userStudy')
    .config(['$locationProvider', '$routeProvider', 'LoopBackResourceProvider', '$mdThemingProvider', '$translateProvider',
        function ($locationProvider, $routeProvider, LoopBackResourceProvider, $mdThemingProvider, $translateProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.when('/home', {
                templateUrl: 'views/home/home.template.html'
            }).when('/register', {
                templateUrl: 'views/register/register.template.html'
            }).when('/', {
                templateUrl: 'views/login/login.template.html'
            }).when('/create-study', {
                templateUrl: 'views/create-study/create-study.template.html'
            }).when('/user-preferences', {
                templateUrl: 'views/user-preferences/user-preferences.template.html'
            }).otherwise({redirectTo: '/'});


            // Use a custom auth header instead of the default 'Authorization'
            LoopBackResourceProvider.setAuthHeader('X-Access-Token');

            // Change the URL where to access the LoopBack REST API server
            LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

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


            $translateProvider.translations('en-EN', {
                'LOGIN': {
                    'WELCOME' : 'Welcome to Frozen Sea',
                    'NO_MORE' : 'No more facebook and mouth propaganda',
                    'FIND': 'Find and create user studies online',
                    'MORE': 'Learn more',
                    'NO_ACCOUNT': 'You don\'t have an account yet?',
                    'REGISTER': 'Sign up',
                    'LOGIN_HERE' : 'Sign in to Frozen Sea',
                    'MAIL' : 'E-Mail',
                    'PASSWORD': 'Password',
                    'LOGIN': 'Sign in',
                    'ERROR': 'Your login credentials are wrong!'

                },
                'REGISTER': {

                },
                'CREATE_STUDY': {

                },
                'HOME': {

                },
                'USER_PREFERENCES': {

                }
                ,
                'NAVBAR': {

                },
                'STUDY_LIST': {

                }
            });

            $translateProvider.translations('de-DE', {
                'LOGIN': {
                    'WELCOME' : 'Willkommen bei Frozen Sea',
                    'NO_MORE' : 'Schluss mit Facebook und Mundpropaganda',
                    'FIND': 'Finde und erstelle Benutzerstudien einfach online',
                    'MORE': 'Mehr erfahren',
                    'NO_ACCOUNT': 'Du hast noch keinen Account?',
                    'REGISTER': 'Registrieren',
                    'LOGIN_HERE' : 'Einloggen bei Frozen Sea',
                    'MAIL' : 'E-Mail',
                    'PASSWORD': 'Passwort',
                    'LOGIN': 'Einloggen',
                    'ERROR': 'Ihre Anmeldedaten sind falsch!'
                }
            });

            $translateProvider.preferredLanguage('de-DE');

        }])
    .run(['$rootScope', '$location', 'LoopBackAuth', 'AuthService', function ($rootScope, $location, LoopBackAuth, AuthService) {

        var publicRoutes = ['/register'];


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

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            // No public route && not logged in: redirect to /
            if (!isPublicRoute($location.url()) && !LoopBackAuth.accessTokenId) {
                $location.path('/');
                console.log('not auth: redirect to /')
            }

            // Route '/' && logged in: redirect to home
            if (($location.url() == '/') && LoopBackAuth.accessTokenId) {
                $location.path('/home');
                console.log('route / and logged in: redirect to /home');
            }

            /*TODO:Persist $rootScope after refresh (Maybe not needed?)
             if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
             AuthService.refresh(LoopBackAuth.accessTokenId);
             }
             */

            console.log('accesToken:' + LoopBackAuth.accessTokenId);

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
