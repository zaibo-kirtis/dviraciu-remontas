/* @ngInject */
export function AuthService( $http, Session ) {
    return {
        login,
        logout,
        register,
        isAllowed
    };

    function login(email, password) {
        return $http.post('auth/login', { email, password }).then( response => {
            Session.user = response.data;
        });
    }

    function logout() {
        return $http.post('auth/logout').then( () => {
            delete Session.user;
        });
    }

    function register( user ) {
        return $http.post('auth/register', user);
    }

    function isAllowed(permissions) {
        if(!permissions || !permissions.length) {
            return true;
        }

        if(!Session.user) {
            return false;
        }

        return permissions.some( permission => Session.user[ permission ] );
    }
}