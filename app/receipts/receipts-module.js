import { ReceiptsController } from './receipts-list-controller';
import { ReceiptController } from './receipt-edit-controller';
import { ReceiptsService } from './receipts-service';

export const ReceiptsModule = 'ReceiptsModule';

angular.module( ReceiptsModule, [] )
    .controller( 'ReceiptsController', ReceiptsController )
    .controller( 'ReceiptController', ReceiptController )
    .service( 'ReceiptsService', ReceiptsService );