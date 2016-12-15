/* @ngInject */
export function AuthService( $http, Session ) {
    return {
        login(username, password) {
            return $http.post('/login', { username: username, password: password }).then( response => {
                Session.user = response.data;
            });
        },
        logout() {
            return $http.post('/logout' ).then( () => {
                delete Session.user;
            });
        }
    }
}