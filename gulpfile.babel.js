import gulp from 'gulp';

import optionsDev from './tasks/options-dev';
import userscriptDev from './tasks/userscript-dev';

gulp.task('tests-gh-pages', () => {
    return gulp.src([
        'test/**',
        'node_modules/mocha/mocha.*',
        'node_modules/chai/chai.js',
        'node_modules/babel-polyfill/dist/polyfill.js'
    ]).pipe(gulp.dest('./dist/test/'));
});

gulp.task('options-dev', optionsDev);
gulp.task('userscript-dev', userscriptDev);
