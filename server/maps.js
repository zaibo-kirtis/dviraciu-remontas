let express = require( 'express' );
let db = require( './database' );

let mapsController = express.Router();

// add map getters for selects here
mapsController.get( '/frame-types', getMapGetter( 'frame_type', 'id', 'name' ) );
mapsController.get( '/bikes', getMapGetter( 'bike', 'id', 'frame_number' ) );
mapsController.get( '/users', getMapGetter( 'user', 'id', 'email' ) );
mapsController.get( '/services', getMapGetter( 'service', 'id', 'name' ) );
mapsController.get( '/parts', getMapGetter( 'part', 'id', 'name' ) );
mapsController.get( '/cities', getMapGetter( 'city', 'id', 'name' ) );
mapsController.get( '/mechanics', getFirstAndLastNames( 'mechanic', 'id', 'first_name', 'last_name' ) );
mapsController.get( '/sexes', getMapGetter( 'sex', 'id', 'name' ) );
mapsController.get( '/tasks', getMapGetter( 'task', 'id', 'name' ) );
mapsController.get( '/admins', getFirstAndLastNames( 'admin', 'id', 'first_name', 'last_name' ) );
mapsController.get( '/accountants', getFirstAndLastNames( 'accountant', 'id', 'first_name', 'last_name' ) );
mapsController.get( '/clients', getFirstAndLastNames( 'client', 'id', 'first_name', 'last_name' ) );

function getMapGetter( entity, idColumn, nameColumn ) {
    return ( request, response ) => {
        db.query(
            `select ${idColumn}, ${nameColumn} from ${entity}`,
            getResponder( response )
        )
    }
}

function getFirstAndLastNames( entity, idColumn, firstNameColumn, lastNameColumn ) {
    return ( request, response ) => {
        db.query(
            `select ${idColumn}, ${firstNameColumn}, ${lastNameColumn} from ${entity}`,
            getResponder( response )
        )
    }
}

function getResponder( response ) {
    return ( error, rows ) => {
        if( error ) {
            response.status( 400 ).send( error.message );
        } else {
            response.status( 200 ).send( rows );
        }
    }
}

module.exports = mapsController;