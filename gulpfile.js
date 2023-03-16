var gulp              = require('gulp');
var minifycss         = require('gulp-minify-css')
var removeSourcemaps  = require('gulp-remove-sourcemaps');
var rename            = require("gulp-rename");
const sass = require("gulp-sass")(require('sass'));
sass.compiler         = require('node-sass');
const twig = require('gulp-twig');

gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(removeSourcemaps())
    .pipe(gulp.dest('./css'));
});

gulp.task('compileTwig', function () {
  return gulp.src('./templates/*.twig')
    .pipe(twig())
    .pipe(gulp.dest('./'));
});

function compileTwig() {
  return gulp.src('src/templates/**/*.twig')
    .pipe(twig())
    .pipe(gulp.dest('dist'));
}


gulp.task('cssmin', function () {
  return gulp.src('./css/style.css')
    .pipe(minifycss({keepSpecialComments : 0}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('cssrename', function () {
  return gulp.src('./css/style.css')
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('build', gulp.series([
  'sass',
  'cssmin',
  'compileTwig'
]));

gulp.task('sass:watch', function () {
  gulp.watch([
    './scss/*.scss',
    './scss/**/*.scss',
    './templates/**/*.twig',
  ], gulp.series(['build']));
});

gulp.task('default', gulp.series(['sass:watch']));