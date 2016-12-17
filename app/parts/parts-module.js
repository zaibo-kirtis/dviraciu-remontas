import { PartsController } from './parts-list-controller';
import { PartController } from './part-edit-controller';
import { PartsService } from './parts-service';

export const PartsModule = 'PartsModule';

angular.module( PartsModule, [] )
    .controller( 'PartsController', PartsController )
    .controller( 'PartController', PartController )
    .service( 'PartsService', PartsService );