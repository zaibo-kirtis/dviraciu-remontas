import { PartReportController } from './part-report-edit-controller';
import { PartsReportService } from './parts-report-service';

export const PartsReportModule = 'PartsReportModule';

angular.module( PartsReportModule, [] )
    .controller( 'PartReportController', PartReportController )
    .service( 'PartsReportService', PartsReportService );