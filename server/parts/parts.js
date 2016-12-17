let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getParts: require( './get-all.sql' ),
    getPart: require( './get.sql' ),
    savePart: require( './save.sql' ),
    deletePart: require( './delete.sql' ),
    countParts: require( './count.sql' )
};

let partsRoutes = express.Router();

partsRoutes.get( '/', getParts );
partsRoutes.get( '/:id', getPart );
partsRoutes.post( '/', savePart );
partsRoutes.delete( '/:id', deletePart );

function getParts( request, response ) {
    db.query( queries.getParts, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getPart( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getPart, request.params, ( error, rows ) => {
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

function savePart( request, response ) {
    db.query( queries.savePart, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deletePart( request, response ) {
    db.query( queries.deletePart, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = partsRoutes;