/* @ngInject */
export function MechanicController( MechanicsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        MechanicsService.saveMechanic( self.model ).then( () => {
            $location.path( '/mechanics' );
        }, self.handleError );
    };

    function getMechanic() {
        self.clearError();

        if( $routeParams.id ) {
            MechanicsService.getMechanic( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getUsers().then( response => {
            self.frameTypes = response.data;
        }, self.handleError );
    }

    getMechanic();
}
