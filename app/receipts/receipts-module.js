import { ReceiptsController } from './receipts-list-controller';
import { ReceiptsService } from './receipts-service';

export const ReceiptsModule = 'ReceiptsModule';

angular.module( ReceiptsModule, [] )
    .controller( 'ReceiptsController', ReceiptsController )
    .service( 'ReceiptsService', ReceiptsService );