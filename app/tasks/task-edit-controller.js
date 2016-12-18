/* @ngInject */
export function TaskController( TasksService, MapsService, $routeParams, $location, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        TasksService.saveTask( self.model ).then( () => {
            $location.path( '/tasks' );
        }, self.handleError );
    };

    function getTask() {
        self.clearError();

        if( $routeParams.id ) {
            TasksService.getTask( $routeParams.id ).then( response => {
                self.model = response.data;
            }, self.handleError );
        }
    }

    getTask();
}

