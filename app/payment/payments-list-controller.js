/* @ngInject */
export function PaymentsController( PaymentsService, $controller ) {
    let self = this;
    $controller('BaseController', { vm: self });

    this.list = [];

    this.deletePayment = function deletePayment( payment ) {
        self.clearError();

        PaymentsService.deletePayment( payment ).then( () => {
            getPayments();
        }, self.handleError );
    };

    function getPayments() {
        self.clearError();

        PaymentsService.getPayments().then( ( response ) => {
            self.list = response.data;
        }, self.handleError );
    }

    getPayments();
}

