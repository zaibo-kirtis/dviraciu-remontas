/* @ngInject */
export function OrderController( OrdersService, BikesService, MapsService, $routeParams, $location, $controller, $q ) {
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

        self.model = {
            tasks: [],
            parts: []
        };

        if( $routeParams.id ) {
            OrdersService.getOrder( $routeParams.id ).then( response => {
                self.model = response.data;

                self.model.tasks = self.model.tasks || [];
                self.model.parts = self.model.parts || [];
            }, self.handleError );
        }
        $q.all([
            BikesService.getBikes(),
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

