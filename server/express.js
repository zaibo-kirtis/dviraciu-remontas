let express = require( 'express' );
let path = require( 'path' );
let bodyParser = require( 'body-parser' );
let session = require( 'express-session' );
let guid = require( 'node-uuid' );
let response = require( './response' );

let auth = require( './auth' );
let config = require( '../config' );
let mapsRouter = require( './maps' );
let reportsRouter = require( './reports/reports' );
let albumsRouter = require( './orders/orders' );
let bikesRouter = require( './bikes/bikes' );
let usersRouter = require( './users/users' );
let mechanicsRouter = require( './mechanics/mechanics' );
let servicesRouter = require( './services/services' );
let partsRouter = require( './parts/parts' );
let paymentRouter = require( './payment/payment' );
let wageRouter = require( './wage/wage' );
let taskRouter = require( './tasks/tasks' );
let clientRouter = require( './clients/clients' );
let receiptRouter = require( './receipts/receipts' );
let wagesReportRouter = require( './wage-report/wage-report' );
let receiptsReportRouter = require( './receipt-report/receipt-report' );
let partsReportRouter = require( './part-report/part-report' );
let accountantsRouter = require( './accountants/accountants' );

let app = express();

app.use( '/js/', express.static( path.join( config.rootDir, config.staticDir ) ) );
app.use( '/css/', express.static( path.join( config.rootDir, '/node_modules/bootstrap/dist/' ) ) );
app.use( '/fa/', express.static( path.join( config.rootDir, '/node_modules/font-awesome/' ) ) );

configureMiddleware( app );
configureRoutes( app );

function getIndex( request, response ) {
    response.sendFile( path.join( config.rootDir, 'index.html' ) );
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
    app.use( '/api/services', servicesRouter );
    app.use( '/api/mechanics', mechanicsRouter );
    app.use( '/api/accountants', accountantsRouter );
    app.use( '/api/parts', partsRouter );
    app.use( '/api/payments', paymentRouter );
    app.use( '/api/wages', wageRouter );
    app.use( '/api/tasks', taskRouter );
    app.use( '/api/clients', clientRouter );
    app.use( '/api/receipts', receiptRouter );
    app.use( '/api/wages-report', wagesReportRouter );
    app.use( '/api/receipts-report', receiptsReportRouter );
    app.use( '/api/parts-report', partsReportRouter );

    app.post( '/auth/login', auth.login );
    app.post( '/auth/logout', auth.logout );
    app.post( '/auth/register', auth.register );

    app.get( '/bike.ico', ( request, response ) => {
        response.sendFile( path.join( config.rootDir, config.favicon ) );
    } );

    app.get( '/*', getIndex );
}

function configureMiddleware( app ) {
    app.use( bodyParser.json() );

    app.use( session( {
        secret: 'lel',
        cookie: {
            key: 'sid',
            maxAge: 3 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
            genid: createGuid,
            rolling: true
        }
    } ) );

    app.use( '/api/*', auth.loggedIn );
}

module.exports = app;