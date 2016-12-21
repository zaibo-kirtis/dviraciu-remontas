/* @ngInject */
export function WagesReportService( $http ) {
    return {
        getWagesReport: (data) => $http.post( '/api/wages-report', data )
    }
}