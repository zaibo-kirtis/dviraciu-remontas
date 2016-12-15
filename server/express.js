let express = require( 'express' );
let path = require( 'path' );
let bodyParser = require( 'body-parser' );
let session = require( 'express-session' );
let guid = require( 'guid' );
let response = require( './response');

let auth = require('./auth');
let config = require( '../config' );
let mapsRouter = require( './maps' );
let reportsRouter = require( './reports/reports' );
let albumsRouter = require( './orders/orders' );
let bikesRouter = require( './bikes/bikes' );
let usersRouter = require( './users/users' );

let app = express();

configureMiddleware( app );
configureRoutes( app );

app.use( express.static( path.join(config.rootDir, config.staticDir) ) );
app.use( express.static( path.join(config.rootDir, '/node_modules/bootstrap/dist/' ) ) );
app.use( express.static( path.join(config.rootDir, '/node_modules/font-awesome') ) );

function getIndex( request, response ) {
    response.sendFile( path.join( config.rootDir, 'index.html') );
}

function createGuid() {
    return guid.create().value;
}

function configureRoutes( app ) {
    app.use( '/api/maps', mapsRouter );
    app.use( '/api/reports', reportsRouter );

    app.use( '/api/users', usersRouter );
    app.use( '/api/orders', albumsRouter );
    app.use( '/api/bikes', bikesRouter );

    app.post( '/login', auth.login );
    app.post( '/logout', auth.logout );
    app.get( '/', getIndex );
    app.get( '/bike.ico', ( request, response ) => {
        response.sendFile( path.join(config.rootDir, config.favicon) );
    } );
}

function configureMiddleware( app ) {
    app.use( bodyParser.json() );

    app.use( session({
        secret: 'lel',
        cookie: {
            key: 'sid',
            maxAge: 3 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
            genid: createGuid,
            rolling: true
        }
    }));

    app.use( '/api/*', auth.loggedIn );
}

module.exports = app;