/* @ngInject */
export function TasksService( $http ) {
    return {
        getTasks: () => $http.get( '/api/tasks' ),
        getTask: ( id ) => $http.get( `/api/tasks/${id}` ),
        saveTask: ( task ) => $http.post( '/api/tasks', task ),
        deleteTask: ( task ) => $http.delete( `/api/tasks/${task.id}` )
    }
}