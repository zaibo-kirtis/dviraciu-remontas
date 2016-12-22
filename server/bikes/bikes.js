let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getBikes: require( './get-all.sql' ),
    getBike: require( './get.sql' ),
    saveBike: require( './save.sql' ),
    deleteBike: require( './delete.sql' ),
    countBikes: require( './count.sql' )
};

let bikesRoutes = express.Router();

bikesRoutes.get( '/', getBikes );
bikesRoutes.get( '/:id', getBike );
bikesRoutes.post( '/', saveBike );
bikesRoutes.delete( '/:id', deleteBike );

function getBikes( request, response ) {
    let userID = request.session.user.clientId;
    request.body.user_id = userID;
    db.query( queries.getBikes,request.body, ( error, rows ) => {
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
        db.query( queries.getBike, request.params, ( error, rows ) => {
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
    let data = request.body;
    data.clientId = request.session.user.access.client;

    db.query( queries.saveBike, data, ( error, rows ) => {
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
    db.query( queries.deleteBike, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = bikesRoutes;