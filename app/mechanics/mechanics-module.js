import { MechanicsController } from './mechanics-list-controller';
import { MechanicController } from './mechanic-edit-controller';
import { MechanicsService } from './mechanics-service';

export const MechanicsModule = 'MechanicsModule';

angular.module( MechanicsModule, [] )
    .controller( 'MechanicsController', MechanicsController )
    .controller( 'MechanicController', MechanicController )
    .service( 'MechanicsService', MechanicsService );