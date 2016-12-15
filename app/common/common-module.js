import { AlertDirective } from './directives/alert/alert';
import { capitalize } from './filters/capitalize';
import { toTime } from './filters/to-time';
import { MapsService } from './services/maps';
import { BaseController } from './controllers/base-controller';

export const CommonModule = 'CommonModule';

angular.module( CommonModule, [] )

    .controller( 'BaseController', BaseController )
    .directive( 'alert', AlertDirective )
    .filter( 'capitalize', capitalize )
    .filter( 'toTime', toTime )
    .factory( 'MapsService', MapsService );