/* @ngInject */
export function JobsReportService( $http ) {
    return {
        getJobsReport: (data) => $http.post( '/api/jobs-report', data )
    }
}