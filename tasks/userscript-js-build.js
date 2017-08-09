const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

module.exports = () => {
    gutil.log('compiling JS...');

    return browserify().transform(babelify, {
            presets: ['stage-0', 'es2015'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
        })
        .require('./src/userscript.main.js', {
            entry: true
        })
        .bundle()
        .pipe(source('userscript.user.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
};