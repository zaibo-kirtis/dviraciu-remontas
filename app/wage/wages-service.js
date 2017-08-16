/* @ngInject */
export function WagesService( $http ) {
    return {
        getWages: () => $http.get( 'api/wages' ),
        getWage: ( id ) => $http.get( `/api/wages/${id}` ),
        saveWage: ( wage ) => $http.post( 'api/wages', wage ),
        deleteWage: ( wage ) => $http.delete( `/api/wages/${wage.id}` )
    }
}