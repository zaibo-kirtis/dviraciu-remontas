import { WageReportController } from './wage-report-edit-controller';
import { WagesReportService } from './wages-report-service';

export const WagesReportModule = 'WagesReportModule';

angular.module( WagesReportModule, [] )
    .controller( 'WageReportController', WageReportController )
    .service( 'WagesReportService', WagesReportService );