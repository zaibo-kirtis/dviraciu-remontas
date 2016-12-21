/* @ngInject */
export function WageReportController($controller, WagesReportService) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.model = {
        date: new Date()
    };
    this.submit = function submit() {
        debugger;
        self.clearError();

        WagesReportService.getWageReport( self.model ).then( (response) => {
            self.wageReport = response.data;
        }, self.handleError );
    };
}

