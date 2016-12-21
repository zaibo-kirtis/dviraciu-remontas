/* @ngInject */
export function ClientController( ClientsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
        dateRegistered : new Date(),
        modified : new Date(),
        birthdate : new Date()
    };
    this.submit = function submit() {
        self.clearError();
        self.model.modified = Date.now();
        ClientsService.saveClient( self.model ).then( () => {
            $location.path( '/clients' );
        }, self.handleError );
    };

    function getClient() {
        self.clearError();

        if( $routeParams.id ) {
            ClientsService.getClient( $routeParams.id ).then( response => {


                response.data.dateRegistered = new Date(response.data.dateRegistered);
                response.data.modified = new Date(response.data.modified);
                response.data.birthdate = new Date(response.data.birthdate);

                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getSexes().then( response => {
            self.sexes = response.data;
        }, self.handleError );
    }

    getClient();
}
