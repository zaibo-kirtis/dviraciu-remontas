let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getJobsReport: require( './get-report.sql' )
};

let JobsReportRoutes = express.Router();

JobsReportRoutes.post( '/', getJobsReport );

function getJobsReport( request, response ) {
    db.query( queries.getJobsReport, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send( rows );
        }
    } );
}

module.exports = JobsReportRoutes;