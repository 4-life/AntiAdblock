const gulp = require('gulp');
const gutil = require('gulp-util');

module.exports = () => {
    gutil.log('copy Files...');

    return gulp.src([
        'src/img/extension-icons/**',
        'src/extension/**'
    ]).pipe(gulp.dest('./dist/'));
};
