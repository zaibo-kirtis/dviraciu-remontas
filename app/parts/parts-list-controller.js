/* @ngInject */
export function PartsController( PartsService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deletePart = function deletePart( part ) {
        self.clearError();

        PartsService.deletePart( part ).then( () => {
            getParts();
        }, self.handleError );
    };

    function getParts() {
        self.clearError();

        PartsService.getParts().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getParts();
}

