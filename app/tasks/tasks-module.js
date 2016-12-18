import { TasksController } from './tasks-list-controller';
import { TaskController } from './task-edit-controller';
import { TasksService } from './tasks-service';

export const TasksModule = 'TasksModule';

angular.module( TasksModule, [] )
    .controller( 'TasksController', TasksController )
    .controller( 'TaskController', TaskController )
    .service( 'TasksService', TasksService );