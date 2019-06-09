var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

const paths = {
    stylesheets:'./src/stylesheets/*.scss',
    src:'./src',
}

function watcher(){
    function sassCompiler(cb){
        gulp.src(paths.stylesheets)
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gulp.dest(paths.src));
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

watcher();



