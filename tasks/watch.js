const gulp = require('gulp');
const watch = require('gulp-watch');

module.exports = () => {
    return watch('./src/**/*.{less,js,json,html}', () => {
        gulp.start('build-dev');
    });
};
