/* @ngInject */
import { BicycleSystemRouter } from './router';
import { MenuController } from './menu-controller';

import { CommonModule } from './common/common-module';
import { AuthModule } from './auth/auth-module';

import { OrdersModule } from './orders/orders-module';
import { BikesModule } from './bikes/bikes-module';
import { MechanicsModule } from './mechanics/mechanics-module';
import { ServicesModule } from './services/services-module';

let BicycleSystem = angular.module( 'BicycleSystem', [
    'ngRoute',
    'templates',

    OrdersModule,
    BikesModule,
    MechanicsModule,
    ServicesModule,

    AuthModule,
    CommonModule
] )
    .controller( 'MenuController', MenuController )
    .config( BicycleSystemRouter )
    .run(( AuthService ) => {
        return AuthService.login();
    });