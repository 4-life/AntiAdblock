const gulp = require('gulp');
const clean = require('gulp-clean');

module.exports = () => {
    return gulp.src('./dist/common.style.**')
        .pipe(clean({force: true}));
};