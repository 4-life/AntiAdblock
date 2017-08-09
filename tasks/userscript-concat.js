const gulp = require('gulp');
const concat = require('gulp-concat');

module.exports = () => {
  return gulp.src(['./src/userscript/compiler.meta.js', './dist/style.js', './dist/extension/userscript.js'])
    .pipe(concat('userscript.user.js'))
    .pipe(gulp.dest('./dist/userscript/'));
};
