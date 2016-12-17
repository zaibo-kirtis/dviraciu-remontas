/* @ngInject */
export function MenuController( AuthService, $controller ) {
    $controller('BaseController', { vm: this });

    angular.extend(this, { logout });

    function logout() {
        AuthService.logout();
    }
}