/* @ngInject */
export function RedirectController( MenuItems, AuthService, $location ) {
    let item = MenuItems.find(item => {
        return AuthService.isAllowed(item.permissions)
    });

    if(item) {
        $location.path(`/${item.route}`);
    }
    else $location.path('/login');
}