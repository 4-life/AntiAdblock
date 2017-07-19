const gulp = require('gulp');
const concat = require('gulp-concat');

module.exports = () => {
  return gulp.src(['./src/contentscript/compiler.meta.js', './dist/common.style.js', './dist/contentscript.user.js'])
    .pipe(concat('contentscript.user.js'))
    .pipe(gulp.dest('./dist/'));
};
