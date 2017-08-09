const gulp = require('gulp');
const gutil = require('gulp-util');

module.exports = () => {
    gutil.log('copy Files...');

    return gulp.src([
        'src/extension/**',
        '!src/extension/css{,/**}'
    ]).pipe(gulp.dest('./dist/extension/'));
};
