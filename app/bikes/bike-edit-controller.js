/* @ngInject */
export function BikeController( BikesService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    angular.extend( self, { submit } );
    $controller('BaseController', { vm: self });

    function getBike() {
        self.clearError();

        if( $routeParams.id ) {
            BikesService.getBike( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getFrameTypes().then( response => {
            self.frameTypes = response.data;
        }, self.handleError );
    }

    function submit() {
        self.clearError();

        BikesService.saveBike( self.model ).then( () => {
            $location.path( '/bikes' );
        }, self.handleError );
    }

    getBike();
}

