/* @ngInject */
export function PaymentController( PaymentsService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
      date: Date.now
    };
    this.submit = function submit() {
        self.clearError();

        PaymentsService.savePayment( self.model ).then( () => {
            $location.path( '/payments' );
        }, self.handleError );
    };

    function getPayment() {
        self.clearError();

        if( $routeParams.id ) {
            PaymentsService.getPayment( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        MapsService.getFrameTypes().then( response => {
            self.frameTypes = response.data;
        }, self.handleError );
    }

    getPayment();
}

