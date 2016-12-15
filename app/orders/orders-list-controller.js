/* @ngInject */
export function OrdersController( OrdersService, $controller ) {
    let self = this;

    angular.extend( self, {
        list: [],
        deleteOrder: deleteOrder
    } );

    $controller('BaseController', { vm: self });

    function deleteOrder( order ) {
        self.clearError();

        OrdersService.deleteOrder( order ).then( () => {
            getOrders();
        }, self.handleError );
    }

    function getOrders() {
        self.clearError();

        OrdersService.getOrders().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getOrders();
}

