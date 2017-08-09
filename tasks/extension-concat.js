const gulp = require('gulp');
const concat = require('gulp-concat');

module.exports = () => {
  return gulp.src(['./dist/style.js', './dist/extension/userscript.js'])
    .pipe(concat('userscript.js'))
    .pipe(gulp.dest('./dist/extension/'));
};
