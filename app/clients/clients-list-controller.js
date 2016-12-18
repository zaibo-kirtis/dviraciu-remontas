/* @ngInject */
export function ClientsController( ClientsService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteClient = function deleteClient( client ) {
        self.clearError();

        ClientsService.deleteClient( client ).then( () => {
            getClients();
        }, self.handleError );
    };

    function getClients() {
        self.clearError();

        ClientsService.getClients().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getClients();
}

