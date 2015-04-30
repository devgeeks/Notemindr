var gulp         = require('gulp');
var shell        = require('gulp-shell');
var concat       = require('gulp-concat');
var less         = require('gulp-less');
var path         = require('path');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');

var lessFiles = [
  'src/less/*.less',
  'src/components/**/*.less'
];

var filesToMove = [
  './bower_components/mdi/fonts/**',
  './bower_components/mdi/*.css'
];
gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('www'));
});

var browsers = ['Chrome', 'Android', 'Blackberry', 'Firefox', 'iOS'];
gulp.task('styles', ['move'], function () {
  gulp.src(lessFiles)
    .pipe(concat('index.css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
       browsers: browsers,
       cascade: false
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('www/css'));
});

gulp.task('styles-dev', ['move'],function () {
  gulp.src(lessFiles)
    .pipe(concat('index.css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
       browsers: browsers,
       cascade: false
    }))
    .pipe(gulp.dest('www/css'));
});

var files = [ 'src/*', 'src/**/*' ];

gulp.task('build', shell.task([ 'npm run build' ]));
gulp.task('build-dev', shell.task([ 'npm run build-dev' ]));
gulp.task('test', shell.task([ 'npm test' ]));

gulp.task('watch', function () {
  gulp.watch(files, ['build-dev']);
});

gulp.task('watch-tests', function () {
  gulp.watch(files, ['test-dev']);
});
