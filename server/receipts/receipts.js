let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getReceipts: require( './get-all.sql' ),
    saveReceipt: require( './save.sql' ),
    countReceipts: require( './count.sql' ),
    getReceiptsForClient: require( './get-for-client.sql' )
};

let ReceiptsRoutes = express.Router();

ReceiptsRoutes.get( '/', getReceipts );
ReceiptsRoutes.post( '/', saveReceipt );

function getReceipts( request, response ) {

    let clientId = request.session.user.access.client;

    if(clientId) {
        db.query( queries.getReceiptsForClient, { clientId }, handle );
    } else {
        db.query( queries.getReceipts, handle );
    }

    function handle ( error, rows ) {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    }
}

function saveReceipt( request, response ) {
    db.query( queries.saveReceipt, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = ReceiptsRoutes;