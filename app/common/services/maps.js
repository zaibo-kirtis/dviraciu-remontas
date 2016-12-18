/* @ngInject */
export function MapsService( $http ) {
    return {
        getFrameTypes: () => $http.get( '/api/maps/frame-types' ),
        getUsers: () => $http.get( 'api/maps/users' ),
        getCities: () => $http.get( 'api/maps/cities' ),
        getSexes: () => $http.get( 'api/maps/sexes' ),
        getServices: () => $http.get( 'api/maps/services' ),
        getClients: (  ) => $http.get( `/api/maps/clients` ),
        getAdmins: (  ) => $http.get( `/api/maps/admins` ),
        getMechanics: (  ) => $http.get( `/api/maps/mechanics` ),
        getAccountants: (  ) => $http.get( `/api/maps/accountants` )
    }
}