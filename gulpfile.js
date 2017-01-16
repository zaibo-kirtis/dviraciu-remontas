let gulp = require( 'gulp' );
let watchify = require( 'watchify' );
let browserify = require( 'browserify' );
let sourcemaps = require( 'gulp-sourcemaps' );
let source = require( 'vinyl-source-stream' );
let buffer = require( 'vinyl-buffer' );
let babelify = require( 'babelify' );
let concat = require( 'gulp-concat' );
let annotate = require( 'gulp-ng-annotate' );
let inject = require( 'gulp-inject' );
let seq = require( 'run-sequence' );
let templateCache = require( 'gulp-angular-templatecache' );
let flatten = require( 'gulp-flatten' );

let config = require( './config' );

function compile( watch ) {
    let bundle =  browserify( config.js )
        .transform( babelify, {
            presets: [ 'es2015' ]
        } );

    if( watch ) {
        bundle.on( 'update', () => {
            buildJs( bundle );
        } )
    }

    return buildJs( bundle );
}

function buildJs( browserifiedBundle ) {

    browserifiedBundle.bundle()
        .pipe( source( 'app.js' ) )
        .pipe( buffer() )
        .pipe( annotate() )
        .pipe( sourcemaps.init() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.staticDir ) )
        .on( 'error', ( error ) => {
            console.error(error)
        });
}

function buildHtml() {
    return gulp.src( config.html )
        .pipe( flatten() )
        .pipe( templateCache( config.templateCache ) )
        .pipe( gulp.dest( `${config.staticDir}` ) );
}

function buildLibs() {
    return gulp.src( config.libs )
        .pipe( gulp.dest( `./${config.staticDir}/libs` ) );
}

gulp.task( 'watch', function() {
    gulp.watch( config.html[ 0 ], [ 'html' ] );
} );

gulp.task( 'compile', () => compile( false ) );
gulp.task( 'compile-watch', () => compile( true ) );
gulp.task( 'html', () => buildHtml() );
gulp.task( 'libs', () => buildLibs() );

gulp.task( 'prod', () => {
    return seq( 'libs', 'html', [ 'compile' ] );
} );

gulp.task( 'dev', () => {
    return seq( 'libs', 'html', [ 'compile-watch', 'watch' ] );
} );

gulp.task( 'default', ['prod']);