// Initialize modules
const {src,dest,watch,series,parallel}  = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// file path variables
const files = {
    sassPath : './app/scss/**/*.scss',
    jsPath : './app/js/**/*.js',
    imagesPath : './app/images/**/*.+(png|jpg|gif|svg)'
}
// Sass Task
function SassTask()
{
    return src(files.sassPath)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss([autoprefixer,cssnano]))
            .pipe(sourcemaps.write('.'))
            .pipe(dest('dist'))
            .pipe(browserSync.reload({stream : true}));
}
// JS Task
function jsTask()
{
    return src(files.jsPath)
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(dest('dist'))
}
// Cachebusting Task
function CacheBustTask()
{
    const cbString = new Date().getTime();
    return src(['app/index.html'])
            .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
            .pipe(dest('.'))
}
//Watch Task
function WatchTask()
{
    watch([files.sassPath,files.jsPath]
        ,parallel(SassTask,jsTask));
    watch('*.html').on('change',browserSync.reload);
    watch(files.jsPath).on('change',browserSync.reload)
}

function browsersync(done)
{
    browserSync.init({
        server : {
            baseDir : "app"
        },
      
    })
    done()
}

exports.default = series(
    parallel(SassTask,jsTask),
    CacheBustTask,
    parallel(browsersync,WatchTask)
)