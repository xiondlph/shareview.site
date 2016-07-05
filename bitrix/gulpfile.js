'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
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
        .pipe(gulp.dest(pub + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src(src + 'templates/*.html')
        .pipe(gulp.dest(pub))
        .pipe(browserSync.stream());
});

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: pub
        },
        port: '4444',
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
    gulp.watch(src + 'js/**/*.*', ['js']);
});

gulp.task(
    'default',
    [
        'watchers',
        'sass',
        'js',
        'html',
        'sync'
    ]
);