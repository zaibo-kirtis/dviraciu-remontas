/* @ngInject */
export function UsersService( $http ) {
    return {
        getUsers: () => $http.get( '/api/users' ),
        getUserById: ( id ) => $http.get( `/api/users/${id}` ),
        saveUser: ( user ) => $http.post( '/api/users', user ),
        deleteUser: ( user ) => $http.delete( `/api/users/${user.id}` )
    }
}