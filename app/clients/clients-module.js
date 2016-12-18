import { ClientsController } from './clients-list-controller';
import { ClientController } from './client-edit-controller';
import { ClientsService } from './clients-service';

export const ClientsModule = 'ClientsModule';

angular.module( ClientsModule, [] )
    .controller( 'ClientsController', ClientsController )
    .controller( 'ClientController', ClientController )
    .service( 'ClientsService', ClientsService );