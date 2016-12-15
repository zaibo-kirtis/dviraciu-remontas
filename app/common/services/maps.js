/* @ngInject */
export function MapsService( $http ) {
    return {
        getFrameTypes: () => $http.get( '/api/maps/frame-types' ),
    }
}