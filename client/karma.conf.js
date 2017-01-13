//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-loader/angular-loader.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/jquery/dist/jquery.js',
            'app.module.js',
            'index.html',
            'components/*/*.js',
            'components/*/*.html',
            'services/*.js',
            'views/*/*.js',
            'views/*/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'

        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        preprocessors: {
            '**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/',
            stripSuffix: '.ext',
            prependPrefix: 'served/',
            moduleName: 'templates'
        }

    });
};
