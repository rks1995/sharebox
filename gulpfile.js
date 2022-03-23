const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const rev = require('gulp-rev');
const del = require('del');

gulp.task('css', (cb) => {
  gulp
    .src('./assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(
      rename({
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/assets/css'));
  cb();
});

gulp.task('minifyJs', (cb) => {
  gulp
    .src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
  cb();
});

gulp.task('imageMin', (cb) => {
  gulp
    .src('./assets/**/*.+(png|jpeg|svg|gif|jpg)')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/assets/images'));
  cb();
});

// gulp.task('scripts', (cb) => {
//   gulp
//     .src('./assets/js/*.js')
//     .pipe(concat('main.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./public/assets/js'));
//   cb();
// });

gulp.task('clean', (cb) => {
  del('./public/assets');
  cb();
});

gulp.task('default', gulp.series(['clean', 'css', 'minifyJs', 'imageMin']));

gulp.task('watch', function () {
  gulp.watch('./assets/scss/*.scss', ['css']);
  gulp.watch('./assets/js/**/*.js', ['minifyJs']);
});
