/* @ngInject */
export function LoginController( AuthService, $location, $controller ) {
    let self = this;
    angular.extend(self, { login });
    $controller('BaseController', { vm: self });

    function login() {
        self.clearError();

        AuthService.login( self.username, self.password ).then( () => {
            $location.path( '/' );
        }, self.handleError );
    }
}

