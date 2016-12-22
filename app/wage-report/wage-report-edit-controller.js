/* @ngInject */
export function WageReportController($controller, WagesReportService) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.submit = function submit() {
        var tempFrom = new Date(self.model.from);
        var tempTo = new Date(self.model.to);
        tempFrom = tempFrom.toISOString().slice(0,10).replace(/-/g,"-");
        tempTo = tempTo.toISOString().slice(0,10).replace(/-/g,"-");
        self.model.from = tempFrom;
        self.model.to = tempTo;
        self.clearError();
        WagesReportService.getWagesReport( self.model ).then( (response) => {
            self.wagesReport = response.data;
        }, self.handleError );
    };
}

