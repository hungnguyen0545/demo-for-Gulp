var gulp = require('gulp');// have to require to using Gulp
var sass = require('gulp-sass') // require gulp-sass from node-modules
autoprefixer = require('gulp-autoprefixer');// add vendor free css.
var browserSync = require('browser-sync').create();// require this code to use brownser sync
var useRef = require('gulp-useref');
var uglify = require('gulp-uglify');//use the gulp-uglify plugin to help with minifying JavaScript files
var gulpIf = require('gulp-if');// gulp-if to ensure that we only attempt to minify JavaScript files.
var cssnano = require('gulp-cssnano');//minify the concatenated CSS file
var runSequence = require('run-sequence');

// demo create gulp task

gulp.task('hello',function(done)
{
    console.log('Hello Hung!');
    done();
})

gulp.task('sass',function()
{
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())// Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css')) // the destination folder where css will be stored 
        .pipe(browserSync.stream())
})

gulp.task('sass', function () {   
    return gulp.src('src/scss/**/*.scss')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(browserSync.reload({
             stream:true
            }))
           .pipe(gulp.dest('src/css'))
 });
//browser Sync task
gulp.task('browserSync',function(){
    browserSync.init({
        server : {
            baseDir : 'app'
        }
    })  
})
// // gulp watch syntax
// gulp.task('watch', gulp.series('browserSync','sass'),function()
// {
//    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
//    gulp.watch('app/*.html').on("change", browserSync.reload); 
//    gulp.watch('app/js/**/*.js').on('change', browserSync.reload); 
// })

//Step 1: creating browser reload function
//Browser Reload Function
gulp.task('reload', function(done){
    browserSync.reload();
    done();
})
//Step 2: altering watch function to reload the browser
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass','reload'));
})
// /Final step: create a live-server function.
gulp.task('live-server', gulp.series('browserSync', 'watch'));
// gulp useref task
gulp.task('useref',function(){
    return gulp.src('app/*.html')
                .pipe(useRef())
                .pipe(gulpIf('*.js', uglify()))
                .pipe(gulp.dest('dist'))
})  

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
  })  