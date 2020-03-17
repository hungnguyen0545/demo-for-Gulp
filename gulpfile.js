var gulp = require('gulp'); // have to require to using Gulp
var sass = require('gulp-sass') // require gulp-sass from node-modules
var autoprefixer = require('gulp-autoprefixer');// add vendor free css.
var browserSync = require('browser-sync').create();// require this code to use brownser sync
var useRef = require('gulp-useref');
var uglify = require('gulp-uglify');//use the gulp-uglify plugin to help with minifying JavaScript files
var gulpIf = require('gulp-if');// gulp-if to ensure that we only attempt to minify JavaScript files.
var cssnano = require('gulp-cssnano');//minify the concatenated CSS file
var runSequence = require('run-sequence');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin')


// demo create gulp task

function demoTask(cb)
{
    console.log('hello');
    cb();
}
exports.default = demoTask

function convertSasstoCss()  {
    return gulp.src('src/scss/**/*.scss')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(browserSync.reload({
             stream:true
            }))
           .pipe(gulp.dest('src/css'))
 };
 exports.sass = convertSasstoCss
//browser Sync task
function browserSyncTask(){
    browserSync.init({
        server : {
            baseDir : 'app'
        }
    })  
}

// // gulp watch syntax
// gulp.task('watch', gulp.series('browserSync','sass'),function()
// {
//    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
//    gulp.watch('app/*.html').on("change", browserSync.reload); 
//    gulp.watch('app/js/**/*.js').on('change', browserSync.reload); 
// })


function reload(done){
    browserSync.reload();
    done();
};

function autoUpdate(cb)
{
    gulp.watch('src/scss/**/*.scss',gulp.series(convertSasstoCss,reload));
    cb();
}

exports.default = gulp.series(
    browserSyncTask,
    autoUpdate,
);
    

// /Final step: create a live-server function.
//gulp.task('live-server', gulp.series(browserSync, watch));
// gulp useref task
// gulp.task('useref',function(){
//     return gulp.src('app/*.html')
//                 .pipe(useRef())
//                 .pipe(gulpIf('*.js', uglify()))
//                 .pipe(gulp.dest('dist'))
// })  
 

