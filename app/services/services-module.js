import { ServicesController } from './services-list-controller';
import { ServiceController } from './service-edit-controller';
import { ServicesService } from './services-service';

export const ServicesModule = 'ServicesModule';

angular.module( ServicesModule, [] )
    .controller( 'ServicesController', ServicesController )
    .controller( 'ServiceController', ServiceController )
    .service( 'ServicesService', ServicesService );