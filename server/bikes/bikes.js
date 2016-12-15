let express = require( 'express' );
let db = require( './../database' );
let helpers = require( './../helpers' );

let queries = {
    getBikes: require( './get-all.sql' ),
    getBike: require( './get.sql' ),
    saveBike: require( './save.sql' ),
    deleteBike: require( './delete.sql' ),
    countBikes: require( './count.sql' )
};

let bikesController = express.Router();

bikesController.get( '/', getBikes );
bikesController.get( '/:id', getBike );
bikesController.post( '/', saveBike );
bikesController.delete( '/:id', deleteBike );

function getBikes( request, response ) {
    db.query( queries.getBikes, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getBike( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( helpers.insertData( queries.getBike, request.params ), ( error, rows ) => {
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

function saveBike( request, response ) {
    db.query( helpers.insertData( queries.saveBike, request.body ), ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteBike( request, response ) {
    db.query( helpers.insertData( queries.deleteBike, request.params ), ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = bikesController;