let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getPayments: require( './get-all.sql' ),
    getPayment: require( './get.sql' ),
    savePayment: require( './save.sql' ),
    deletePayment: require( './delete.sql' ),
    countPayments: require( './count.sql' )
};

let PaymentsRoutes = express.Router();

PaymentsRoutes.get( '/', getPayments );
PaymentsRoutes.get( '/:id', getPayment );
PaymentsRoutes.post( '/', savePayment );
PaymentsRoutes.delete( '/:id', deletePayment );

function getPayments( request, response ) {
    db.query( queries.getPayments, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getPayment( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getPayment, request.params, ( error, rows ) => {
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

function savePayment( request, response ) {
    db.query( queries.savePayment, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deletePayment( request, response ) {
    db.query( queries.deletePayment, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = PaymentsRoutes;