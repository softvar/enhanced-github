var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var APP_NAME = 'github-plus';
var bases = {
 app: 'src/',
 dist: 'github-plus-zip/',
};

var paths = {
 scripts: ['src/*.js'],
 html: [ 'index.html' ],
 manifest: [ 'manifest.json' ],
 icons: [ 'icons/*.png' ],
};

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(jshint())
 .pipe(jshint.reporter('default'))
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
 // Copy html
 gulp.src(paths.html, {base: '.'})
 .pipe(gulp.dest(bases.dist));

 // Copy lib scripts, maintaining the original directory structure
 gulp.src(paths.scripts, {base: '.'})
 .pipe(gulp.dest(bases.dist));

 // Copy icons, maintaining the original directory structure
 gulp.src(paths.icons, {base: '.'})
 .pipe(gulp.dest(bases.dist));

 // Copy manifest.json, maintaining the original directory structure
 gulp.src(paths.manifest, {base: '.'})
 .pipe(gulp.dest(bases.dist));

});

// Delete the dist directory
gulp.task('zip', function() {
 return gulp.src('github-plus-zip/**/*')
    .pipe(zip(APP_NAME + '.zip'))
    .pipe(gulp.dest('.'));
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts', 'copy']);