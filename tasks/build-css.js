const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const lessAutoprefix = require('less-plugin-autoprefix');
const inlineImages = require('less-plugin-inline-urls');
const inlineAssets = require('gulp-inline-assets');

module.exports = () => {
    gutil.log('compiling CSS...');

    const autoprefix = new lessAutoprefix({ browsers: ['last 3 versions', '>1%', 'Firefox ESR', 'Opera 12.1'] });

    return gulp.src('src/common/css/style.less')
      .pipe(less({
        plugins: [autoprefix, inlineImages]
      }))
      .pipe(inlineAssets())
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/'));
};
