let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getWageReport: require( './getReport.sql' )
};

let WagesRoutes = express.Router();

WagesReportRoutes.post( '/', getWageReport );

function getWageReport( request, response ) {
    let accountantID = request.session.user.access.accountant;
    request.body.accountant_id = accountantID;
    db.query( queries.getWageReport, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = WagesReportRoutes;