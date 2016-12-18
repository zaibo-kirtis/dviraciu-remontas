/* @ngInject */
export function UserController( UsersService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        UsersService.saveUser( self.model ).then( () => {
            $location.path( '/users' );
        }, self.handleError );
    };

    function getUser() {
        self.clearError();

        if( $routeParams.id ) {
            UsersService.getUser( $routeParams.id ).then( response => {
                self.model.dateRegistered = new Date(self.model.dateRegistered);
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getClients().then( response => {
            self.clients = response.data;
        }, self.handleError );

        MapsService.getAccountants().then( response => {
            self.accountants = response.data;
        }, self.handleError );

        MapsService.getMechanics().then( response => {
            self.mechanics = response.data;
        }, self.handleError );

        MapsService.getAdmins().then( response => {
            self.admins = response.data;
        }, self.handleError );
    }

    getUser();
}