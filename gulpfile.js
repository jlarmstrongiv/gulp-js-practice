// research glob, notify, gulp load plugins, omitting source map for build, newer version of babel, use fs instead of require
// ordinary or dual dependencies
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
// javascript
const uglify = require('gulp-uglify');
const babel = require('gulp-babel'); // npmsd babel-preset-es2015 and babel-core
// css
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
// handlebars
const handlebars = require('gulp-handlebars');
const handlebarsLib = require('handlebars');
const declare = require('gulp-declare');
const wrap = require('gulp-wrap');
// images
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
// other
const del = require('del');
const zip = require('gulp-zip');

const DIST_PATH = 'public/dist'
const SCRIPTS_PATH = 'public/scripts/**/*.js';
const STYLES_PATH = 'public/scss/**/*.scss';
const TEMPLATES_PATH = 'public/templates/**/*.hbs'
const IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}'
// const STYLES_PATH = 'public/css/**/*.css';

gulp.task('styles', () => {
  console.log('styles');

  return gulp.src(['public/scss/styles.scss'])
    .pipe(plumber((err) => {
      console.log('styles task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

gulp.task('scripts', () => {
  console.log('scripts');

  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber((err) => {
      console.log('scripts task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

gulp.task('images', () => {
  console.log('images');

  return gulp.src(IMAGES_PATH)
    .pipe(imagemin(
      [
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
      ]
    ))
    .pipe(gulp.dest(DIST_PATH + '/images'))
});

gulp.task('templates', () => {
  console.log('templates');

  return gulp.src(TEMPLATES_PATH)
    .pipe(handlebars({
      handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task('clean', function () {
  return del.sync([
    DIST_PATH
  ])
});

gulp.task('export', () => {
  return gulp.src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts'], () => {
  console.log('default');
});

gulp.task('watch', ['default'], () => {
  console.log('watch');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(STYLES_PATH, ['styles']);
  gulp.watch(TEMPLATES_PATH, ['templates']);
});

// Old Styles

// gulp.task('styles', () => {
//   console.log('styles');
//
//   return gulp.src(['public/css/reset.css', STYLES_PATH])
//     .pipe(plumber((err) => {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(concat('styles.css'))
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions']
//     }))
//     .pipe(minifyCss())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload())
// });
