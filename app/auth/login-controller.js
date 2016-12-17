/* @ngInject */
export function LoginController( AuthService, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.login = function() {
        self.clearError();

        AuthService.login( self.model.email, self.model.password ).then( () => {
            $location.path( '/' );
        }, self.handleError );
    };
}

