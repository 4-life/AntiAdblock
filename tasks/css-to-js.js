const gulp = require('gulp');
const cssToJs = require('gulp-css2js');

module.exports = () => {
    return gulp.src('./dist/css/style.css')
        .pipe(cssToJs())
        .pipe(gulp.dest('./dist/'));
};
