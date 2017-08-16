/* @ngInject */
export function PaymentsService( $http ) {
    return {
        getPayments: () => $http.get( 'api/payments' ),
        getPayment: ( id ) => $http.get( `/api/payments/${id}` ),
        savePayment: ( payment ) => $http.post( 'api/payments', payment ),
        deletePayment: ( payment ) => $http.delete( `/api/payments/${payment.id}` )
    }
}