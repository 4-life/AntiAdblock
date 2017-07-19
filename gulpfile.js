const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);

gulp.task('extension', () => {
    runSequence('clean', 'build-css', 'build-extension', 'copy-extension-files');
});

gulp.task('userscript', () => {
    runSequence('clean', 'build-css', 'build-contentscript', 'css-to-js', 'concat', 'clean-unused');
});

gulp.task('build-contentscript', require('./tasks/build-contentscript'));
gulp.task('clean', require('./tasks/clean'));
gulp.task('build-extension', require('./tasks/build-extension'));
gulp.task('build-css', require('./tasks/build-css'));
gulp.task('copy-extension-files', require('./tasks/copy-extension-files'));
gulp.task('clean-unused', require('./tasks/clean-unused'));
gulp.task('css-to-js', require('./tasks/css-to-js'));
gulp.task('concat', require('./tasks/concat'));
