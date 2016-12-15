/* @ngInject */
export function BaseController( vm, Session, $location ) {
    angular.extend( vm, {
        handleError, clearError, admin, mechanic, accountant, client, loggedIn
    });

    function handleError( error ) {
        switch( error.status ) {
            case 401: {
                delete Session.user;
                $location.path( '/login' );
                break;
            }
            default: {
                vm.error = error.message;
            }
        }
    }

    function clearError() {
        delete vm.error;
    }

    function admin() { return Session.user && Session.user.admin; }
    function mechanic() { return Session.user && Session.user.mechanic; }
    function accountant() { return Session.user && Session.user.accountant; }
    function client() { return Session.user && Session.user.client; }
    function loggedIn() { return !!Session.user; }
}