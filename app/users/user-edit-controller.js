/* @ngInject */
export function UserController( UsersUser, MapsUser, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        UsersUser.saveUser( self.model ).then( () => {
            $location.path( '/users' );
        }, self.handleError );
    };

    function getUser() {
        self.clearError();

        if( $routeParams.id ) {
            UsersUser.getUser( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsUser.getCities().then( response => {
            self.cities = response.data;
        }, self.handleError );
    }

    getUser();
}