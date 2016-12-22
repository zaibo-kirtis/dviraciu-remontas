import { AccountantsController } from './accountants-list-controller';
import { AccountantController } from './accountant-edit-controller';
import { AccountantsService } from './accountants-service';

export const AccountantsModule = 'AccountantsModule';

angular.module( AccountantsModule, [] )
    .controller( 'AccountantsController', AccountantsController )
    .controller( 'AccountantController', AccountantController )
    .service( 'AccountantsService', AccountantsService );