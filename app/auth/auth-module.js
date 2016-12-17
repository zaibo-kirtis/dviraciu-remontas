import { LoginController } from './login-controller';
import { RegisterController } from './register-controller';
import { AuthService } from './auth-service';

export const AuthModule = 'AuthModule';

angular.module( AuthModule, [] )
    .controller( 'LoginController', LoginController )
    .controller( 'RegisterController', RegisterController )
    .service( 'AuthService', AuthService )
    .value( 'Session', {} );