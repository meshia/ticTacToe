var gulp = require('gulp'),
    less = require('gulp-less'),
    del = require('del'),
    server = require('gulp-server-livereload'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('build-clean', function () {
    return del(['dist']);
});

gulp.task('styles', function() {
    return gulp.src('src/less/main.less')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(less({compress: false}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copyIndex', function() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copyImages', function() {
    return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('minCss', function () {
    return gulp.src('css/main.css')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(less({compress: false}))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['copyIndex']);
    gulp.watch('src/less/*', ['styles']);
    gulp.watch('src/images/*', ['copyImages']);
});


gulp.task('dev', function () {
  runSequence('build-clean',
              'copyIndex',
              'copyImages',
              'styles',
              'watch');
});

gulp.task('default', ['dev']);

gulp.task('production', function (callback) {

  runSequence('build-clean',
              'copyIndex',
              'copyImages',
              'styles',
              'minCss',
              callback);
  }
);
