const gulp = require('gulp');
const cssToJs = require('gulp-css2js');

module.exports = () => {
    return gulp.src('./dist/common.style.css')
        .pipe(cssToJs())
        .pipe(gulp.dest('./dist/'));
};
