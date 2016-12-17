/* @ngInject */
export function WageController( WagesService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
        date: new Date()
    };
    this.submit = function submit() {
        self.clearError();

        WagesService.saveWage( self.model ).then( () => {
            $location.path( '/wages' );
        }, self.handleError );
    };

    function getWage() {
        self.clearError();

        WagesService.getWage( $routeParams.id ).then( response => {
            response.data.date = new Date(response.data.date);
            self.model = response.data;
        }, self.handleError );
    }

    getWage();
}

