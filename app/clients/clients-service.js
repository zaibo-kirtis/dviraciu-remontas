/* @ngInject */
export function ClientsService( $http ) {
    return {
        getClients: () => $http.get( 'api/clients' ),
        getClient: ( id ) => $http.get( `/api/clients/${id}` ),
        saveClient: ( client ) => $http.post( 'api/clients', client ),
        deleteClient: ( client ) => $http.delete( `/api/clients/${client.id}` )
    }
}