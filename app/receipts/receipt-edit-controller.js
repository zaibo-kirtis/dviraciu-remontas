/* @ngInject */
export function ReceiptController( ReceiptsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        ReceiptsService.saveReceipt( self.model ).then( () => {
            $location.path( '/receipts' );
        }, self.handleError );
    };

    function getReceipt() {
        self.clearError();

        if( $routeParams.id ) {
            ReceiptsService.getReceipt( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getFrameTypes().then( response => {
            self.frameTypes = response.data;
        }, self.handleError );
    }

    getReceipt();
}

