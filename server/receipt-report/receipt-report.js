let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getReceiptsReport: require( './getReport.sql' )
};

let ReceiptsReportRoutes = express.Router();

ReceiptsReportRoutes.post( '/', getReceiptsReport );

function getReceiptsReport( request, response ) {
    let accountantID = request.session.user.access.accountant;
    request.body.accountant_id = accountantID;

    db.query( queries.getReceiptsReport, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send( rows );
        }
    } );
}

module.exports = ReceiptsReportRoutes;