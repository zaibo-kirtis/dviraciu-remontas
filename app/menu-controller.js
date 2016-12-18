/* @ngInject */
export function MenuController( AuthService, MenuItems, $controller, $location ) {
    $controller('BaseController', { vm: this });

    this.menuItems = MenuItems;

    this.logout = function logout() {
        AuthService.logout().then(() => {
            $location.path('/');
        }, self.handleError);
    };
}