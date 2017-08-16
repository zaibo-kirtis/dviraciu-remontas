/* @ngInject */
export function PartsService( $http ) {
    return {
        getParts: () => $http.get( 'api/parts' ),
        getPart: ( id ) => $http.get( `/api/parts/${id}` ),
        savePart: ( part ) => $http.post( 'api/parts', part ),
        deletePart: ( part ) => $http.delete( `/api/parts/${part.id}` )
    }
}