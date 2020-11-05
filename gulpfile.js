const gulp = require('gulp');
const {src, dest} = require('gulp');
const sass = require('gulp-sass');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const minifyCSS = require('gulp-csso');

sass.compiler = require('node-sass');

function css() {
    return src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('dist/css/'))
}

function imagemin() {
    return src('src/images/**/*.*')
        .pipe(imageMin())
        .pipe(dest('dist/img'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/',
        }
    });
    gulp.watch('./src/sass/**/*.scss', css);
    gulp.watch('src/images/**/*.*', imagemin);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
}
  
exports.watch = watch;