var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
//var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

//var data = require('./src/pug/data/data');
var srcPath = './src/';
var destPath = './dist/';


gulp.task('pug', function() {
  // const LOCAL_DATA = {text: 'Hello from Data'};
  return gulp.src(srcPath + 'pug/htdocs/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
      //locals: data
    }))
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
});

// External sourcemaps
gulp.task('stylus', function () {
  return gulp.src(srcPath + 'css/style.styl')
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(stylus())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(srcPath + 'js/script.js')
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp.src(srcPath + 'img/*.jpg')
    .pipe(gulp.dest(destPath + 'img'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['pug', 'stylus', 'js', 'img'], function() {
    browserSync.init({
        //proxy: "earthdance.dev",
        browser: "google chrome canary",
        server: destPath,
        port: 4040
    });
    gulp.watch(srcPath + 'css/**/*.styl', ['stylus']);
    gulp.watch(srcPath + 'pug/**/*.pug', ['pug']);
    gulp.watch(srcPath + 'js/**/*.js', ['js']);
    //gulp.watch(srcPath +'/*.php').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
