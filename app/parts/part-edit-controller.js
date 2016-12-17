/* @ngInject */
export function PartController( PartsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        PartsService.savePart( self.model ).then( () => {
            $location.path( '/parts' );
        }, self.handleError );
    };

    function getPart() {
        self.clearError();

        if( $routeParams.id ) {
            PartsService.getPart( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getFrameTypes().then( response => {
            self.frameTypes = response.data;
        }, self.handleError );
    }

    getPart();
}

