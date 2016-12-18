let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getClients: require( './get-all.sql' ),
    getClient: require( './get.sql' ),
    saveClient: require( './save.sql' ),
    deleteClient: require( './delete.sql' ),
    countClients: require( './count.sql' )
};

let clientsRoutes = express.Router();

clientsRoutes.get( '/', getClients );
clientsRoutes.get( '/:id', getClient );
clientsRoutes.post( '/', saveClient );
clientsRoutes.delete( '/:id', deleteClient );

function getClients( request, response ) {
    db.query( queries.getClients, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getClient( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getClient, request.params, ( error, rows ) => {
            if( error ) {
                response.status( 400 );
                response.send( error.message );
            } else {
                response.send( rows[ 0 ] );
            }
        } );
    } else {
        response.end();
    }
}

function saveClient( request, response ) {
    db.query( queries.saveClient, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteClient( request, response ) {
    db.query( queries.deleteClient, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = clientsRoutes;