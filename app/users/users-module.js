import { UsersController } from './users-list-controller';
import { UserController } from './user-edit-controller';
import { UsersService } from './users-service';

export const UsersModule = 'UsersModule';

angular.module( UsersModule, [] )
    .controller( 'UsersController', UsersController )
    .controller( 'UserController', UserController )
    .service( 'UsersService', UsersService );