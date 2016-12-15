/* @ngInject */
export function BikesService( $http ) {
    return {
        getBikes: () => $http.get( '/api/bikes' ),
        getBike: ( id ) => $http.get( `/api/bikes/${id}` ),
        saveBike: ( bike ) => $http.post( '/api/bikes', bike ),
        deleteBike: ( bike ) => $http.delete( `/api/bikes/${bike.id}` )
    }
}