/* @ngInject */
export function ServicesController( ServicesService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteService = function deleteService( service ) {
        self.clearError();

        ServicesService.deleteService( service ).then( () => {
            getServices();
        }, self.handleError );
    };

    function getServices() {
        self.clearError();

        ServicesService.getServices().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getServices();
}