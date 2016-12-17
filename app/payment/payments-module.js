import { PaymentsController } from './payments-list-controller';
import { PaymentController } from './payment-edit-controller';
import { PaymentsService } from './payments-service';

export const PaymentsModule = 'PaymentsModule';

angular.module( PaymentsModule, [] )
    .controller( 'PaymentsController', PaymentsController )
    .controller( 'PaymentController', PaymentController )
    .service( 'PaymentsService', PaymentsService );