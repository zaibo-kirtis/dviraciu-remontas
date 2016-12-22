/* @ngInject */
export function JobsReportController( $controller, MapsService, JobsReportService) {
    let self = this;
    $controller('BaseController', { vm: self });

    let now = new Date();

    self.model = {
        from: now,
        to: new Date(now.setMonth(now.getMonth() - 1))
    };

    this.submit = function submit() {
        self.clearError();

        let tempFrom = new Date( self.model.from );
        let tempTo = new Date( self.model.to );

        tempFrom = tempFrom.toISOString().slice(0,10).replace(/-/g,"-");
        tempTo = tempTo.toISOString().slice(0,10).replace(/-/g,"-");

        let data = {
            mechanicId: self.model.mechanicId,
            from: tempFrom,
            to: tempTo
        };

        JobsReportService.getJobsReport( data ).then( (response) => {
            self.report = response.data;
        }, self.handleError );
    };

    MapsService.getMechanics().then( response => {
        self.mechanics = response.data;
    });
}

