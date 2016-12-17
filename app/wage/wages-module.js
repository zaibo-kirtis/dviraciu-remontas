import { WagesController } from './wages-list-controller';
import { WageController } from './wage-edit-controller';
import { WagesService } from './wages-service';

export const WagesModule = 'WagesModule';

angular.module( WagesModule, [] )
    .controller( 'WagesController', WagesController )
    .controller( 'WageController', WageController )
    .service( 'WagesService', WagesService );