// research glob
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload')

const SCRIPTS_PATH = 'public/scripts/**/*.js'

gulp.task('default', () => {
  console.log('default');
});

gulp.task('styles', () => {
  console.log('styles');
});

gulp.task('scripts', () => {
  console.log('scripts');

  return gulp.src(SCRIPTS_PATH)
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
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
});
