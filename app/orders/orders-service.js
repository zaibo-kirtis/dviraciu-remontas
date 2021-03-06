/* @ngInject */
export function OrdersService( $http ) {
    return {
        getOrders: () => $http.get( 'api/orders' ),
        getOrder: ( id ) => $http.get( `/api/orders/${id}` ),
        saveOrder: ( order ) => $http.post( 'api/orders', order ),
        deleteOrder: ( order ) => $http.delete( `/api/orders/${order.id}` ),

        beginOrder: ( order ) => $http.post( `/api/orders/${order.id}/state/?to=2`),
        completeOrder: ( order ) => $http.post( `/api/orders/${order.id}/state/?to=3`)
    }
}