/* @ngInject */
export function MechanicController( MechanicsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
        dateLastPayed : Date.now,
        dateHired : Date.now,
        birthdate : Date.now
    };
    this.submit = function submit() {
        self.clearError();
        self.modified = Date.now();
        MechanicsService.saveMechanic( self.model ).then( () => {
            $location.path( '/mechanics' );
        }, self.handleError );
    };

    function getMechanic() {
        self.clearError();

        if( $routeParams.id ) {
            MechanicsService.getMechanic( $routeParams.id ).then( response => {
                response.data.dateLastPayed = new Date(response.data.dateLastPayed);
                response.data.dateHired = new Date(response.data.dateHired);
                response.data.birthdate = new Date(response.data.birthdate);

                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getSexes().then( response => {
            self.sexes = response.data;
        }, self.handleError );

        MapsService.getServices().then( response => {
            self.services = response.data;
        }, self.handleError );
    }

    getMechanic();
}
