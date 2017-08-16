/* @ngInject */
export function AccountantsService( $http ) {
    return {
        getAccountants: () => $http.get( 'api/accountants' ),
        getAccountant: ( id ) => $http.get( `/api/accountants/${id}` ),
        saveAccountant: ( accountant ) => $http.post( 'api/accountants', accountant ),
        deleteAccountant: ( accountant ) => $http.delete( `/api/accountants/${accountant.id}` )
    }
}