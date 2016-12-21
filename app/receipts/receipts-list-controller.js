/* @ngInject */
export function ReceiptsController( ReceiptsService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteReceipt = function deleteReceipt( receipt ) {
        self.clearError();

        ReceiptsService.deleteReceipt( receipt ).then( () => {
            getReceipts();
        }, self.handleError );
    };

    function getReceipts() {
        self.clearError();

        ReceiptsService.getReceipts().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getReceipts();
}

