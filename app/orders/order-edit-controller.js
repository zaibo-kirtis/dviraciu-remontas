/* @ngInject */
export function OrderController( OrdersService, MapsService, $routeParams, $location, $controller, $q ) {
    let self = this;
    $controller( 'BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        OrdersService.saveOrder( self.model ).then( () => {
            $location.path( '/orders' );
        }, self.handleError );
    };

    function getOrder() {
        self.clearError();

        if( $routeParams.id ) {
            OrdersService.getOrder( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }

        $q.all([
            MapsService.getOrderTypes(),
            MapsService.getRecordLabels(),
            MapsService.getArtists(),
            MapsService.getDiscounts()
        ]).then( responses => {
            self.orderTypes = responses[ 0 ].data;
            self.recordLabels = responses[ 1 ].data;
            self.artists = responses[ 2 ].data;
            self.discounts = responses[ 3 ].data;
        }, self.handleError );
    }
    getOrder();
}

