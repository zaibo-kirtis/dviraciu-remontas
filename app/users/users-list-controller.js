/* @ngInject */
export function UsersController( UsersService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteUser = function deleteUser( user ) {
        self.clearError();

        UsersService.deleteUser( user ).then( () => {
            getUsers();
        }, self.handleError );
    };

    function getServices() {
        self.clearError();

        UsersService.getUsers().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getUsers();
}