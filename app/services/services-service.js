/* @ngInject */
export function ServicesService( $http ) {
    return {
        getServices: () => $http.get( '/api/services' ),
        getService: ( id ) => $http.get( `/api/services/${id}` ),
        saveService: ( service ) => $http.post( '/api/services', service ),
        deleteService: ( service ) => $http.delete( `/api/services/${service.id}` )
    }
}