let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getWages: require( './get-all.sql' ),
    getWage: require( './get.sql' ),
    saveWage: require( './save.sql' ),
    deleteWage: require( './delete.sql' ),
    countWages: require( './count.sql' )
};

let WagesRoutes = express.Router();

WagesRoutes.get( '/', getWages );
WagesRoutes.get( '/:id', getWage );
WagesRoutes.post( '/', saveWage );
WagesRoutes.delete( '/:id', deleteWage );

function getWages( request, response ) {
    db.query( queries.getWages, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getWage( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getWage, request.params, ( error, rows ) => {
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

function saveWage( request, response ) {
    request.body.accountant_id = request.session.user.access.accountant;

    db.query( queries.saveWage, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteWage( request, response ) {
    db.query( queries.deleteWage, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = WagesRoutes;