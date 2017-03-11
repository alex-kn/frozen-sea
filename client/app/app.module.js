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
    'studyDetailsView',
    'studyDetailsEdit',
    'userPreferences',
    'myStudies',
    'editProfile',
    'userStudy.version',
    'navBarDirective',
    'studyListDirective',
    'archiveListDirective',
    'participateDialogDirective',
    'AppointmentService',
    'AdvisorService',
    'ToastService',
    'EmailService',
    'AuthService',
    'register',
    'ngMaterial'
]);