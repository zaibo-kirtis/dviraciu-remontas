let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getServices: require( './get-all.sql' ),
    getService: require( './get.sql' ),
    saveService: require( './save.sql' ),
    deleteService: require( './delete.sql' ),
    countServices: require( './count.sql' )
};

let servicesRoutes = express.Router();

servicesRoutes.get( '/', getServices );
servicesRoutes.get( '/:id', getService );
servicesRoutes.post( '/', saveService );
servicesRoutes.delete( '/:id', deleteService );

function getServices( request, response ) {
    db.query( queries.getServices, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getService( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getService, request.params, ( error, rows ) => {
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

function saveService( request, response ) {
    db.query( queries.saveService, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteService( request, response ) {
    db.query( queries.deleteService, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = servicesRoutes;