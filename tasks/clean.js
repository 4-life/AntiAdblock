const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');

module.exports = () => {
    gutil.log('clearing folder...');

    return gulp.src('./dist/')
        .pipe(clean());
};
