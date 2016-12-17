/* @ngInject */
export function WagesController( WagesService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteWage = function deleteWage( wage ) {
        self.clearError();

        WagesService.deleteWage( wage ).then( () => {
            getWages();
        }, self.handleError );
    };

    function getWages() {
        self.clearError();

        WagesService.getWages().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getWages();
}

