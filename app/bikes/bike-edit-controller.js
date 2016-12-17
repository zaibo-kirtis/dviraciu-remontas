/* @ngInject */
export function BikeController( BikesService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        BikesService.saveBike( self.model ).then( () => {
            $location.path( '/bikes' );
        }, self.handleError );
    };

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

    getBike();
}

