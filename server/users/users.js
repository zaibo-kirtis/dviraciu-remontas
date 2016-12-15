let express = require( 'express' );
let db = require( './../database' );
let helpers = require( './../helpers' );

let usersController = express.Router();

usersController.get( '/', getUsers );
usersController.get( '/:id', getUser );
usersController.post( '/', saveUser );
usersController.delete( '/:id', deleteUser );

let queries = {
    getUsers: require( './get-all.sql' ),
    getUser: require( './get.sql' ),
    saveUser: require( './save.sql' ),
    deleteUser: require( './delete.sql' ),
    countUsers: require( './count.sql' )
};

function getUsers( request, response ) {
    db.query( queries.getUsers, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getUser( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( helpers.insertData( queries.getUser, request.params ), ( error, rows ) => {
            if( error ) {
                response.status( 400 );
                response.send( error.message );
            } else {
                response.send( rows[ 0 ] );
            }
        } );
    } else {
        response.end();
    }
}

function saveUser( request, response ) {
    db.query( helpers.insertData( queries.saveUser, request.body ), ( error ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteUser( request, response ) {
    db.query( helpers.insertData( queries.deleteUser, request.params ), ( error ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

usersController.getUser = function(username) {
    return new Promise(( resolve, reject ) => {
        let query = helpers.insertData( queries.getUser, { username });

        db.query( query, ( error, rows ) => {
            if( error ) {
                reject( error );
            } else {
                resolve( rows[0] );
            }
        });
    });
};

module.exports = usersController;