var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var connect = require('gulp-connect');


function watcher(){
    const paths = {
        stylesheets:'./src/assets/stylesheets/*.scss',
        src:'./src',
        buildCss:'./src/assets/stylesheets'
    }

    function sassCompiler(cb){
        gulp.src(paths.stylesheets)
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gulp.dest(paths.buildCss));
        cb();
    }
    
    function liveReload(cb){
        gulp.src(paths.src)
        .pipe(connect.reload());
        cb();
    }

    // Initialize the server
    function connectServer(cb){
        connect.server({
            root: paths.src,
            port:3000,
            livereload:true
        });
        cb();
    }

    // Watch server
    function watchServer(cb){
        gulp.watch(paths.stylesheets, gulp.series(sassCompiler,liveReload));
        gulp.watch(paths.src, liveReload);
        cb();
    }

    exports.default = gulp.series(connectServer,watchServer);
}

function build(){
    const paths = {
        dist:'./dist',
        indexHtml:'./src/index.html',
        assets:'./src/assets/*/*',
        buildAssets:'./dist/assets',
        srcJS:'./src/assets/js/*.js',
        srcSass:'./src/assets/js/*.js',
        distJS:'./dist/assets/js',
    }

    function assets(cb){
        
        gulp.src(paths.assets)
        .pipe(gulp.dest(paths.buildAssets))

        // gulp.src(paths.srcJS)
        // .pipe(babel())
        // .pipe(gulp.dest(paths.distJS));

        gulp.src(paths.indexHtml)
        .pipe(gulp.dest(paths.dist))

        cb();

    }

    exports.build = gulp.series(assets);
}
watcher();
build();


