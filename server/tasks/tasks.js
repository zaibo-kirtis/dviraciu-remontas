let express = require( 'express' );
let db = require( './../database' );

let queries = {
    getTasks: require( './get-all.sql' ),
    getTask: require( './get.sql' ),
    saveTask: require( './save.sql' ),
    deleteTask: require( './delete.sql' ),
    countTasks: require( './count.sql' )
};

let tasksRoutes = express.Router();

tasksRoutes.get( '/', getTasks );
tasksRoutes.get( '/:id', getTask );
tasksRoutes.post( '/', saveTask );
tasksRoutes.delete( '/:id', deleteTask );

function getTasks( request, response ) {
    db.query( queries.getTasks, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getTask( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getTask, request.params, ( error, rows ) => {
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

function saveTask( request, response ) {
    db.query( queries.saveTask, request.body, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

function deleteTask( request, response ) {
    db.query( queries.deleteTask, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = tasksRoutes;