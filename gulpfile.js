const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);

gulp.task('build-dev', () => {
    runSequence('extension-css-dev', 'copy-extension-files', 'extension-js-dev', 'common-css-build', 'css-to-js', 'userscript-concat', 'extension-concat');
});

gulp.task('tests-gh-pages', () => {
    return gulp.src([
        'test/**',
        'node_modules/mocha/mocha.*',
        'node_modules/chai/chai.js',
        'node_modules/babel-polyfill/dist/polyfill.js'
    ]).pipe(gulp.dest('./dist/test/'));
});

gulp.task('extension-js-dev', require('./tasks/extension-js-dev'));
gulp.task('common-css-build', require('./tasks/common-css-build'));
gulp.task('copy-extension-files', require('./tasks/copy-extension-files'));
gulp.task('css-to-js', require('./tasks/css-to-js'));
gulp.task('watch', require('./tasks/watch'));
gulp.task('extension-css-dev', require('./tasks/extension-css-dev'));
gulp.task('extension-concat', require('./tasks/extension-concat'));
gulp.task('userscript-concat', require('./tasks/userscript-concat'));
