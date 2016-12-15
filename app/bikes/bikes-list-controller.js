/* @ngInject */
export function BikesController( BikesService, $controller ) {
    let self = this;

    angular.extend( self, {
        list: [],
        deleteBike: deleteBike
    } );

    $controller('BaseController', { vm: self });

    function deleteBike( bike ) {
        self.clearError();

        BikesService.deleteBike( bike ).then( () => {
            getBikes();
        }, self.handleError );
    }

    function getBikes() {
        self.clearError();

        BikesService.getBikes().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getBikes();
}

