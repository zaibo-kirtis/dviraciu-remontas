/* @ngInject */
export function ReceiptsReportService( $http ) {
    return {
        getReceiptsReport: (data) => $http.post( 'api/receipts-report', data )
    }
}