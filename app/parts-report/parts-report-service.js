/* @ngInject */
export function PartsReportService( $http ) {
    return {
        getPartsReport: (data) => $http.post( '/api/parts-report', data )
    }
}