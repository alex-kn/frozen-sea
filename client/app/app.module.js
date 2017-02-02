/**
 * Created by jan on 15.12.16.
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('userStudy', [
    'ngRoute',
    'lbServices',
    'ngResource',
    'pascalprecht.translate',
    'ngAnimate',
    'home',
    'login',
    'createStudy',
    'studyDetails',
    'userPreferences',
    'myStudies',
    'editProfile',
    'userStudy.version',
    'navBarDirective',
    'studyListDirective',
    'archiveListDirective',
    'participateDialogDirective',
    'AuthService',
    'register',
    'ngMaterial'
]);
