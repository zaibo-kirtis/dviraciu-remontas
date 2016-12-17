/* @ngInject */
export function MechanicsController( MechanicsService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteMechanic = function deleteMechanic( mechanic ) {
        self.clearError();

        MechanicsService.deleteMechanic( mechanic ).then( () => {
            getMechanics();
        }, self.handleError );
    };

    function getMechanics() {
        self.clearError();

        MechanicsService.getMechanics().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getMechanics();
}

