/**
 * Created by Jan on 17.02.2017.
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');


// watch files for changes and reload
gulp.task('serve', function() {

    browserSync.init({

        server: {
            baseDir: 'client/app'
        }

    });

    gulp.watch(['client/app/*.html', 'client/app/*.js', 'client/app/*.css', 'client/app/**/*.js','client/app/**/**/*.html', 'client/app/**/**/*.js', 'client/app/**/**/*.css']).on('change', browserSync.reload);

});
