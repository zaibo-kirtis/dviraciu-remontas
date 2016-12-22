/* @ngInject */
export function AccountantsController( AccountantsService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteAccountant = function deleteAccountant( accountant ) {
        self.clearError();

        AccountantsService.deleteAccountant( accountant ).then( () => {
            getAccountants();
        }, self.handleError );
    };

    function getAccountants() {
        self.clearError();

        AccountantsService.getAccountants().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getAccountants();
}

