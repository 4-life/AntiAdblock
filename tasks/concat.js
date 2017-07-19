const gulp = require('gulp');
const concat = require('gulp-concat');

module.exports = () => {
  return gulp.src(['./src/userscript/compiler.meta.js', './dist/common.style.js', './dist/userscript.user.js'])
    .pipe(concat('userscript.user.js'))
    .pipe(gulp.dest('./dist/'));
};
