let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getAccountants: require( './get-all.sql' ),
    getAccountant: require( './get.sql' ),
    saveAccountant: require( './save.sql' ),
    deleteAccountant: require( './delete.sql' ),
    countAccountants: require( './count.sql' )
};

let accountantsRoutes = express.Router();

accountantsRoutes.get( '/', getAccountants );
accountantsRoutes.get( '/:id', getAccountant );
accountantsRoutes.post( '/', saveAccountant );
accountantsRoutes.delete( '/:id', deleteAccountant );

function getAccountants( request, response ) {
    db.query( queries.getAccountants, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getAccountant( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getAccountant, request.params, ( error, rows ) => {
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

function saveAccountant( request, response ) {
    db.query( queries.saveAccountant, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteAccountant( request, response ) {
    db.query( queries.deleteAccountant, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = accountantsRoutes;