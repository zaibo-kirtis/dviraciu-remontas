import { ReceiptReportController } from './receipt-report-edit-controller';
import { ReceiptsReportService } from './receipts-report-service';

export const ReceiptsReportModule = 'ReceiptsReportModule';

angular.module( ReceiptsReportModule, [] )
    .controller( 'ReceiptReportController', ReceiptReportController )
    .service( 'ReceiptsReportService', ReceiptsReportService );