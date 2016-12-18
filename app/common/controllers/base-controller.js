/* @ngInject */
export function BaseController( vm, Session, AuthService, $location ) {
    angular.extend( vm, {
        handleError, clearError, isAllowed, loggedIn
    });

    function handleError( error ) {
        switch( error.status ) {
            case 401: {
                delete Session.user;
                $location.path( '/' );
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

    function isAllowed(permissions) {
        return AuthService.isAllowed(permissions);
    }

    function loggedIn() { return !!Session.user; }
}