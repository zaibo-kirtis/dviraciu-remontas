import { OrdersController } from './orders-list-controller';
import { OrderController } from './order-edit-controller';
import { OrdersService } from './orders-service';

export const OrdersModule = 'OrdersModule';

angular.module( OrdersModule, [] )
    .controller( 'OrdersController', OrdersController )
    .controller( 'OrderController', OrderController )
    .service( 'OrdersService', OrdersService );