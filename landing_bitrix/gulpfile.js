'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');
var extender = require('gulp-html-extend');
var autoprefixer = require('gulp-autoprefixer');

var pub = './dist/';
var src = './src/';

gulp.task('js', function () {
    gulp.src(src + 'js/**/*.*')
        .pipe(gulp.dest(pub + 'js/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    gulp.src(src + 'styles/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(pub + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src(src + 'templates/*.html')
        .pipe(gulp.dest(pub))
        .pipe(browserSync.stream());
});


gulp.task('extend', function () {
    gulp.src(src + 'templates/*.html')
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(pub))

});

gulp.task('img', function () {
    gulp.src(src + 'images/*.*')
        .pipe(gulp.dest(pub+'images'))

});

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: pub
        },
        port: '5504',
        ghostMode: false,
        open: false,
        serveStatic: [src]
    });

    gulp.watch(
        [ '*.html' ],
        { cwd: pub },
        browserSync.reload
    );
});

gulp.task('watchers', function() {
    gulp.watch(src + 'styles/**/*.scss', ['sass']);
    gulp.watch(src + 'templates/**/*.html', ['extend']);
    gulp.watch(src + 'js/**/*.*', ['js']);
    gulp.watch(src + 'images/**/*.*', ['img']);
});

gulp.task(
    'default',
    [
        'watchers',
        'sass',
        'extend',
        'js',
        'img',
        'sync'
    ]
);