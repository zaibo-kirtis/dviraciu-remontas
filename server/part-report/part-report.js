let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getPartsReport: require( './getReport.sql' )
};

let PartsReportRoutes = express.Router();

PartsReportRoutes.post( '/', getPartsReport );

function getPartsReport( request, response ) {
    let accountantID = request.session.user.access.accountant;
    request.body.accountant_id = accountantID;

    db.query( queries.getPartsReport, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send( rows );
        }
    } );
}

module.exports = PartsReportRoutes;