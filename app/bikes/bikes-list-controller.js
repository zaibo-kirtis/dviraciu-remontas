/* @ngInject */
export function BikesController( BikesService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deleteBike = function deleteBike( bike ) {
        self.clearError();

        BikesService.deleteBike( bike ).then( () => {
            getBikes();
        }, self.handleError );
    };

    function getBikes() {
        self.clearError();

        BikesService.getBikes().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getBikes();
}

