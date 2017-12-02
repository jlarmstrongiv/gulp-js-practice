// research glob, notify, gulp load plugins, omitting source map for build, use fs instead of require
const gulp = require('gulp');
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const DIST_PATH = 'public/dist'
const SCRIPTS_PATH = 'public/scripts/**/*.js';
const STYLES_PATH = 'public/css/**/*.css';

gulp.task('default', () => {
  console.log('default');
});

gulp.task('styles', () => {
  console.log('styles');

  return gulp.src(['public/css/reset.css', STYLES_PATH])
    .pipe(plumber((err) => {
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

gulp.task('scripts', () => {
  console.log('scripts');

  return gulp.src(SCRIPTS_PATH)
    .pipe(uglify())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

gulp.task('images', () => {
  console.log('images');
});

gulp.task('watch', () => {
  console.log('watch');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(STYLES_PATH, ['styles'])
});
