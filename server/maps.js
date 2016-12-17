let express = require( 'express' );
let db = require( './database' );

let mapsController = express.Router();

// add map getters for selects here
mapsController.get( '/frame-types', getMapGetter( 'frame_type', 'id', 'name' ) );
mapsController.get( '/bikes', getMapGetter( 'bike', 'id', 'frame_number' ) );
mapsController.get( '/users', getMapGetter( 'user', 'id', 'email' ) );
mapsController.get( '/services', getMapGetter( 'service', 'id', 'name' ) );

function getMapGetter( entity, idColumn, nameColumn ) {
    return ( request, response ) => {
        db.query(
            `select ${idColumn}, ${nameColumn} from ${entity}`,
            getResponder( response )
        )
    }
}

function getResponder( response ) {
    return ( error, rows ) => {
        if( error ) {
            response.status = 400;
            response.send( error.message );
        } else {
            response.send( rows );
        }
    }
}

module.exports = mapsController;