/* @ngInject */
export function RegisterController( AuthService, $location, $controller) {
    let self = this;
    $controller( 'BaseController', { vm: this });

    this.model = {};

    this.register = function register() {
        AuthService.register(self.model).then(() => {
            $location.path('/')
        }, self.handleError);
    };

    this.sexes = [
        { id: 1, name: 'Vyras' },
        { id: 2, name: 'Moteris' },
        { id: 3, name: 'Kita' }
    ]
}