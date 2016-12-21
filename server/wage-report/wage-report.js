let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getWagesReport: require( './getReport.sql' )
};

let WagesReportRoutes = express.Router();

WagesReportRoutes.post( '/', getWagesReport );

function getWagesReport( request, response ) {
    let accountantID = request.session.user.access.accountant;
    request.body.accountant_id = accountantID;

    db.query( queries.getWagesReport, request.body, ( error, rows ) => {
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