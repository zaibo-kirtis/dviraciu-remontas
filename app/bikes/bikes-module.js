import { BikesController } from './bikes-list-controller';
import { BikeController } from './bike-edit-controller';
import { BikesService } from './bikes-service';

export const BikesModule = 'BikesModule';

angular.module( BikesModule, [] )
    .controller( 'BikesController', BikesController )
    .controller( 'BikeController', BikeController )
    .service( 'BikesService', BikesService );