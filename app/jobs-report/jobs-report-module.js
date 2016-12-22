import { JobsReportService } from './jobs-report-service';
import { JobsReportController } from './jobs-report-controller';

export const JobsReportModule = 'JobsReportModule';

angular.module( JobsReportModule, [] )
    .controller( 'JobsReportController', JobsReportController )
    .service( 'JobsReportService', JobsReportService );