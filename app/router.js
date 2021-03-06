/* ngInject */
export function BicycleSystemRouter( $routeProvider, $locationProvider ) {
    $locationProvider.html5Mode(true);
    $routeProvider.addRoutes = addRoutes;

    $routeProvider
        .addRoutes( 'Order' )
        .addRoutes( 'Bike' )
        .addRoutes( 'Mechanic' )
        .addRoutes( 'Payment' )
        .addRoutes( 'Wage' )
        .addRoutes( 'Service' )
        .addRoutes( 'User' )
        .addRoutes( 'Part' )
        .addRoutes( 'Task' )
        .addRoutes( 'Client' )
        .addRoutes( 'Receipt' )
        .addRoutes( 'Accountant' )

        .when( '/login', { controller: 'LoginController', controllerAs: 'login', templateUrl: 'login.html' } )
        .when( '/register', { controller: 'RegisterController', controllerAs: 'register', templateUrl: 'register.html' })
        .when( '/wages-report', { controller: 'WageReportController', controllerAs: 'wagesReport', templateUrl: 'wages-report-edit.html' })
        .when( '/receipts-report', { controller: 'ReceiptReportController', controllerAs: 'receiptsReport', templateUrl: 'receipts-report-edit.html' })
        .when( '/parts-report', { controller: 'PartReportController', controllerAs: 'partsReport', templateUrl: 'parts-report-edit.html' })
        .when( '/jobs-report', { controller: 'JobsReportController', controllerAs: 'jobsReport', templateUrl: 'jobs-report.html' })

        .otherwise({
            controller: 'RedirectController', template: '', controllerAs: 'redirect'
        });
}

function getRoutes( modulePascalCase, moduleCamelCase, moduleKebabCase ) {
    return {
        edit: {
            controller: `${modulePascalCase}Controller`,
            controllerAs: `${moduleCamelCase}`,
            templateUrl: `${moduleKebabCase}-edit.html`
        },
        list: {
            controller: `${modulePascalCase}sController`,
            controllerAs: `${moduleCamelCase}s`,
            templateUrl: `${moduleKebabCase}s-list.html`
        }
    }
}

function addRoutes( module ) {
    let modulePascalCase = module;
    let moduleCamelCase = module.split(/(?=[A-Z])/).map((str, i) => i == 0 ? str.toLowerCase() : str).join('');
    let moduleKebabCase = module.split(/(?=[A-Z])/).map(str => str.toLowerCase()).join('-');

    let routes = getRoutes( modulePascalCase, moduleCamelCase, moduleKebabCase );

    return this
        .when( `/${moduleKebabCase}s`, routes.list )
        .when( `/${moduleKebabCase}`, routes.edit )
        .when( `/${moduleKebabCase}/:id`, routes.edit );
}