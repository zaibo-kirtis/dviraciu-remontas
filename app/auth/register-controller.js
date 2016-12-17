/* @ngInject */
export function RegisterController( AuthService, $location, $controller) {
    let self = this;
    $controller( 'BaseController', { vm: this });

    this.model = {};

    this.register = function register() {
        AuthService.register(self.model).then( () => $location.path( '/login' ));
    };
}