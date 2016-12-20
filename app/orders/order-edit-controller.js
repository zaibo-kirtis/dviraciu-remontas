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
            MapsService.getBikes(),
            MapsService.getTasks(),
            MapsService.getParts(),
            MapsService.getServices()
        ]).then( responses => {
            self.bikes = responses[ 0 ].data;
            self.tasks = responses[ 1 ].data;
            self.parts = responses[ 2 ].data;
            self.services = responses[ 3 ].data;
        }, self.handleError );
    }

    getOrder();
}

