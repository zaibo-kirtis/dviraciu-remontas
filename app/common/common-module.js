import { AlertDirective } from './directives/alert/alert';
import { capitalize } from './filters/capitalize';
import { toTime } from './filters/to-time';
import { MapsService } from './services/maps';
import { BaseController } from './controllers/base-controller';
import { RedirectController } from './controllers/redirect-controller';
import { BuilderDirective } from './directives/builder/builder-directive';

export const CommonModule = 'CommonModule';

angular.module( CommonModule, [] )

    .controller( 'BaseController', BaseController )
    .controller( 'RedirectController', RedirectController )
    .directive( 'builder', BuilderDirective )
    .directive( 'alert', AlertDirective )
    .filter( 'capitalize', capitalize )
    .filter( 'toTime', toTime )
    .factory( 'MapsService', MapsService );