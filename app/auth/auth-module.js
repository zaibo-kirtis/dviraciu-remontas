import { LoginController } from './login-controller';
import { AuthService } from './auth-service';

export const AuthModule = 'AuthModule';

angular.module( AuthModule, [] )
    .controller( 'LoginController', LoginController )
    .service( 'AuthService', AuthService )
    .value( 'Session', {} );