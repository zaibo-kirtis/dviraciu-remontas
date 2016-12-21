/* @ngInject */
export function WageReportController($controller, WagesReportService) {
    let self = this;
    $controller('BaseController', { vm: self });
    this.submit = function submit() {
        self.clearError();
        WagesReportService.getWagesReport( self.model ).then( (response) => {
            self.wagesReport = response.data;
        }, self.handleError );
    };
}

