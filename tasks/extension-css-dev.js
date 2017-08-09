const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');
// const cleanCSS = require('gulp-clean-css');
const lessAutoprefix = require('less-plugin-autoprefix');

module.exports = () => {
    gutil.log('compiling CSS...');

    const autoprefix = new lessAutoprefix({ browsers: ['last 3 versions', '>1%', 'Firefox ESR', 'Opera 12.1'] });

    return gulp.src('src/extension/css/main.less')
      .pipe(less({
        plugins: [autoprefix]
      }))
    //   .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/extension/'));
};
