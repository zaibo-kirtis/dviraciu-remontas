/* @ngInject */
export function AuthService( $http, Session ) {
    return {
        login(email, password) {
            return $http.post('/login', { email, password }).then( response => {
                Session.user = response.data;
            });
        },
        logout() {
            return $http.post('/logout' ).then( () => {
                delete Session.user;
            });
        },
        register( user ) {
            return $http.post('/register', user);
        }
    }
}