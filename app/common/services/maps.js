/* @ngInject */
export function MapsService( $http ) {
    return {
        getFrameTypes: () => $http.get( '/api/maps/frame-types' ),
        getUsers: () => $http.get( 'api/maps/users' ),
        getCities: () => $http.get( 'api/maps/cities' ),
    }
}