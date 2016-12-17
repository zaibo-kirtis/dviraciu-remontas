/* @ngInject */
export function WageController( WagesService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
      date: Date.now
    };
    this.submit = function submit() {
        self.clearError();

        WagesService.saveWage( self.model ).then( () => {
            $location.path( '/wages' );
        }, self.handleError );
    };

    function getWage() {
        self.clearError();

        if( $routeParams.id ) {
            WagesService.getWage( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getFrameTypes().then( response => {
            self.frameTypes = response.data;
        }, self.handleError );
    }

    getWage();
}

