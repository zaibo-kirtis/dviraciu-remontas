/* @ngInject */
import { BicycleSystemRouter } from './router';
import { MenuController } from './menu-controller';

import { CommonModule } from './common/common-module';
import { AuthModule } from './auth/auth-module';

import { OrdersModule } from './orders/orders-module';
import { BikesModule } from './bikes/bikes-module';
import { MechanicsModule } from './mechanics/mechanics-module';
import { PaymentsModule } from "./payment/payments-module";
import { ServicesModule } from './services/services-module';
import { PartsModule } from './parts/parts-module';
import { WagesModule } from "./wage/wages-module";
import { UsersModule } from "./users/users-module";
import { TasksModule } from "./tasks/tasks-module";
import { ClientsModule } from "./clients/clients-module";
import { MenuItems } from './menu-items';
import { WagesReportModule } from "./wage-report/wages-report-module";
import { ReceiptsReportModule } from "./receipt-report/receipts-report-module";
import { PartsReportModule } from "./parts-report/parts-report-module";
import { ReceiptsModule } from './receipts/receipts-module';
import { AccountantsModule } from './accountants/accountants-module';
import { JobsReportModule } from './jobs-report/jobs-report-module';

let BicycleSystem = angular.module( 'BicycleSystem', [
    'ngRoute',
    'templates',

    OrdersModule,
    BikesModule,
    MechanicsModule,
    PaymentsModule,
    ServicesModule,
    PartsModule,
    WagesModule,
    UsersModule,
    TasksModule,
    ClientsModule,
    ReceiptsModule,
    WagesReportModule,
    ReceiptsReportModule,
    PartsReportModule,
    AccountantsModule,
    JobsReportModule,

    AuthModule,
    CommonModule
] )
    .controller( 'MenuController', MenuController )
    .value( 'MenuItems', MenuItems )
    .config( BicycleSystemRouter )
    .run((AuthService) => AuthService.login());