/* @ngInject */
export function TasksController( TasksService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteTask = function deleteTask( task ) {
        self.clearError();

        TasksService.deleteTask( task ).then( () => {
            getTasks();
        }, self.handleError );
    };

    function getTasks() {
        self.clearError();

        TasksService.getTasks().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getTasks();
}

