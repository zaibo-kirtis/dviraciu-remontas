/* @ngInject */
export function ReceiptReportController($controller, ReceiptsReportService) {
    let self = this;
    $controller('BaseController', { vm: self });

    let now = new Date();

    self.model = {
        from: now,
        to: new Date(now.setMonth(now.getMonth() - 1))
    };

    this.submit = function submit() {
        let tempFrom = new Date( self.model.from );
        let tempTo = new Date( self.model.to );

        tempFrom = tempFrom.toISOString().slice(0,10).replace(/-/g,"-");
        tempTo = tempTo.toISOString().slice(0,10).replace(/-/g,"-");

        self.model.from = tempFrom;
        self.model.to = tempTo;
        self.clearError();
        ReceiptsReportService.getReceiptsReport( self.model ).then( (response) => {
            self.receiptsReport = response.data;
        }, self.handleError );
    };
}

