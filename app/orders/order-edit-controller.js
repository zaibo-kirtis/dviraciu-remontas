/* @ngInject */
export function OrderController( OrdersService, MapsService, $routeParams, $location, $controller, $q ) {
    let self = this;
    $controller( 'BaseController', { vm: self });

    this.submit = function submit() {
        self.clearError();

        self.model.tasks = self.tasks
            .filter(task => task.selected)
            .map(task => task.id);

        OrdersService.saveOrder( self.model ).then( () => {
            $location.path( '/orders' );
        }, self.handleError );
    };

    function getOrder() {
        self.clearError();

        if( $routeParams.id ) {
            OrdersService.getOrder( $routeParams.id ).then( response => {
                self.model = response.data;

                let tasks = self.model.tasks || [];
                self.tasks = [];

                tasks.forEach(taskId => {
                    self.tasks[taskId] = { id: taskId, selected: true };
                });

            }, self.handleError );
        }

        $q.all([
            MapsService.getBikes(),
            MapsService.getTasks(),
            MapsService.getServices()
        ]).then( responses => {
            self.bikes = responses[ 0 ].data;
            let tasks = responses[ 1 ].data;
            self.services = responses[ 2 ].data;

            self.tasks = self.tasks || [];

            tasks.forEach(task => {
                self.tasks[task.id] = self.tasks[task.id] || {};
                self.tasks[task.id].id = task.id;
                self.tasks[task.id].name = task.name;
            });
        }, self.handleError );
    }

    getOrder();
}

