/* @ngInject */
export function ServiceController( ServicesService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        ServicesService.saveService( self.model ).then( () => {
            $location.path( '/services' );
        }, self.handleError );
    };

    function getService() {
        self.clearError();

        if( $routeParams.id ) {
            ServicesService.getService( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getCities().then( response => {
            self.cities = response.data;
        }, self.handleError );
    }

    getService();
}