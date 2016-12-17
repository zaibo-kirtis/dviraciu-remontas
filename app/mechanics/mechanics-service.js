/* @ngInject */
export function MechanicsService( $http ) {
    return {
        getMechanics: () => $http.get( '/api/mechanics' ),
        getMechanic: ( id ) => $http.get( `/api/mechanics/${id}` ),
        saveMechanic: ( mechanic ) => $http.post( '/api/mechanics', mechanic ),
        deleteMechanic: ( mechanic ) => $http.delete( `/api/mechanics/${mechanic.id}` )
    }
}