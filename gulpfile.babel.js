// 'use strict';

// Gotta have Gulp
import gulp from 'gulp';

// gulp.task('log', () => {
//   console.log('hello');
// });

import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer'
import pug from 'gulp-pug';
import stylus from 'gulp-stylus';
import evilicons from 'gulp-evil-icons';
import plumber from 'gulp-plumber';
import todo from 'gulp-todo';
import changed from 'gulp-changed';

// For images
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

// JS
import uglify from 'gulp-uglify';
import pump from 'pump';
import concat from 'gulp-concat';
import rename from 'gulp-rename';


// Data content to use with Jade
import data from './src/pug/data/data';

// Used to clear out /dist folder when we run gulp
import del from 'del';

//Send to github pages
import ghPages from 'gulp-gh-pages';


// Set default browser
const defaultBrowser = 'google chrome canary';

// Set path variables
const stylusPath = 'src/css/**/*.styl';
const pugPath = 'src/pug/htdocs/*.pug';
const watchJadePath = 'src/pug/**/*.pug';
const distPath = './dist';
const imgPath = 'src/img/**/*';
const watchJsPath = 'src/js/**/*.js';

// Autoprefixer options
const autoprefixerOptions = {
  browsers: [
    'last 2 versions',
    '> 5%',
    'Firefox ESR'
  ]
};

// BrowserSync Settings and task
browserSync.create();

// Static Server + watching styl/html files
gulp.task('serve', ['stylus', 'pug', 'imgs', 'js'], function() {
  browserSync.init({
    server: distPath,
    browser: defaultBrowser
  });

  gulp.watch(stylusPath, ['stylus']);
  gulp.watch(watchJadePath, ['pug']);
  gulp.watch(watchJsPath, ['js']);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('js', function() {
    return gulp.src([
      'src/js/vendor/countUp/dist/countUp.min.js',
      'src/js/vendor/waypoints/lib/noframework.waypoints.min.js',
      'src/js/vendor/waypoints/lib/shprtcuts/inview.min.js',
      'src/js/script.js',
    ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(distPath))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distPath));
});

// gulp.task('js', function (cb) {
//   pump([
//         gulp.src('src/js/**/*.js'),
//         uglify(),
//         .pipe(concat('script.js')),
//         gulp.dest(distPath)
//     ],
//     cb
//   );
// });

// Compile stylus into CSS & auto-inject into browsers
gulp.task('stylus', function() {
  return gulp.src('src/css/style.styl')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
  	.pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(distPath))
    .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  gulp.src(pugPath)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(pug({
      locals: data,
      pretty: true
    }))
    .pipe(evilicons())
    .pipe(gulp.dest(distPath))
});


gulp.task('imgs', function () {
  return gulp.src(imgPath)
    .pipe(changed('dist/img'))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(`${distPath}/img`))
});


// Clearing task
gulp.task('clean', function () {
  return del([
    //'dist/**/*',
    'dist/*.html',
    'dist/*.css',
    'dist/*.js'
    // we don't want to clean this file though so we negate the pattern
    //'!dist/img'
  ]);
});

// Default task to run
gulp.task('default', ['clean', 'serve']);

gulp.task('log', () => {
  console.dir(data);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
});

// Todo task
gulp.task('todo', () => {
 gulp.src([stylusPath, pugPath])
   .pipe(todo({
     customTags: ['NOTES']
   }))
   .pipe(gulp.dest('./'))
   // -> Will output a TODO.md with your todos
})