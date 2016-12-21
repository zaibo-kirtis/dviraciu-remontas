/* @ngInject */
export function MechanicController( MechanicsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
        dateLastPayed : new Date(),
        dateHired : new Date(),
        birthdate : new Date()
    };
    this.submit = function submit() {
        self.clearError();
        console.log(self.model);
        // self.model.data.dateLastPayed = new Date(self.model.data.dateLastPayed);
        // self.model.data.dateHired = new Date(self.model.data.dateHired);
        // self.model.data.birthdate = new Date(self.model.data.birthdate);
        // self.model.data.datemodified = new Date(self.model.data.datemodified);
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
                response.data.datemodified = new Date(response.data.datemodified);

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
