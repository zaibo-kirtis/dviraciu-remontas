let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getMechanics: require( './get-all.sql' ),
    getMechanic: require( './get.sql' ),
    saveMechanic: require( './save.sql' ),
    deleteMechanic: require( './delete.sql' ),
    countMechanics: require( './count.sql' )
};

let mechanicsRoutes = express.Router();

mechanicsRoutes.get( '/', getMechanics );
mechanicsRoutes.get( '/:id', getMechanic );
mechanicsRoutes.post( '/', saveMechanic );
mechanicsRoutes.delete( '/:id', deleteMechanic );

function getMechanics( request, response ) {
    db.query( queries.getMechanics, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getMechanic( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getMechanic, request.params, ( error, rows ) => {
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

function saveMechanic( request, response ) {
    db.query( queries.saveMechanic, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteMechanic( request, response ) {
    db.query( queries.deleteMechanic, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = mechanicsRoutes;