const gulp        = require('gulp');
const clean       = require('gulp-clean');
const sass        = require('gulp-sass');
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');
const cleanCSS    = require('gulp-clean-css');
const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');

gulp.task('clean', () => gulp
    .src('./public', { read: false })
    .pipe(clean())
);

gulp.task('copyHtml', ['clean'], () => gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./public'))
);

gulp.task('css', ['clean'], () => gulp
    .src('./src/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'))
);

gulp.task('javascript', ['clean'], () => {
    browserify({
        entries: './src/js/app.js'
    })
    .transform(babelify.configure({
        presets: ['env']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', () => {
    gulp.watch('./src/css/*.scss', ['default']);
    gulp.watch(['./src/js/*.js','./src/js/**/*.js'], ['default']);
    gulp.watch('./src/index.html', ['default']);
});

gulp.task('default', ['clean','css','javascript','copyHtml']);