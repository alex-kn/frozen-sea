/**
 * Created by jan on 15.12.16.
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('userStudy', [
    'ngRoute',
    'lbServices',
    'ngResource',
    'home',
    'login',
    'createStudy',
    'userPreferences',
    'userStudy.version',
    'navBarDirective',
    'studyListDirective',
    'AuthService',
    'register',
    'ngMaterial'

]);
