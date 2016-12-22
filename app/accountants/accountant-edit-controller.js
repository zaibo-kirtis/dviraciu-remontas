/* @ngInject */
export function AccountantController( AccountantsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
        dateHired : new Date(),
        modified : new Date(),
        birthdate : new Date()
    };
    this.submit = function submit() {
        self.clearError();
        self.model.modified = Date.now();
        AccountantsService.saveAccountant( self.model ).then( () => {
            $location.path( '/accountants' );
        }, self.handleError );
    };

    function getAccountant() {
        self.clearError();

        if( $routeParams.id ) {
            AccountantsService.getAccountant( $routeParams.id ).then( response => {


                response.data.dateHired = new Date(response.data.dateHired);
                response.data.modified = new Date(response.data.modified);
                response.data.birthdate = new Date(response.data.birthdate);

                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getSexes().then( response => {
            self.sexes = response.data;
        }, self.handleError );
    }

    getAccountant();
}
