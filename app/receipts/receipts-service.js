/* @ngInject */
export function ReceiptsService( $http ) {
    return {
        getReceipts: () => $http.get( 'api/receipts' ),
        saveReceipt: ( receipt ) => $http.post( 'api/receipts', receipt ),
        deleteReceipt: ( receipt ) => $http.delete( `/api/receipts/${receipt.id}` )
    }
}