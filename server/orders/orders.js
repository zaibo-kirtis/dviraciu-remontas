let express = require( 'express' );
let db = require( './../database' );
let response = require( '../response' );

let queries = {
    getOrders: require( './get-all.sql' ),
    getOrder: require( './get.sql' ),
    saveOrder: require( './save.sql' ),
    deleteOrder: require( './delete.sql' ),
    countOrders: require( './count.sql' ),
    insertOrderTask: require( './insert-order-task.sql' )
};

let ordersController = express.Router();

ordersController.get( '/', getOrders );
ordersController.get( '/:id', getOrder );
ordersController.post( '/', saveOrder );
ordersController.delete( '/:id', deleteOrder );

function getOrders( request, response ) {
    db.query( queries.getOrders, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.send( rows );
        }
    } );
}

function getOrder( request, response ) {
    let id = request.params.id;

    if( id ) {
        db.query( queries.getOrder, { id }, ( error, rows ) => {
            if( error ) {
                response.status( 400 );
                response.send( error.message );
            } else {
                let order = rows[ 0 ][ 0 ];
                order.tasks = rows[ 1 ].map( row => row.id );

                response.status( 200 );
                response.send( order );
            }
        } );
    } else {
        response.end();
    }
}

function saveOrder( req, res ) {
    let data = req.body;

    data.orderState = 1;

    db.query( queries.saveOrder, data, ( error, rows ) => {
        if( error ) {
            res.status( 400 );
            res.send( error.message );
        } else {
            let orderId = rows[ 1 ][ 0 ].orderId;

            let promises = data.tasks.map( taskId => {
                return new Promise( ( res, rej ) => {
                    db.query( queries.insertOrderTask, { taskId, orderId }, ( error, rows ) => {
                        if( error ) {
                            rej( error );
                        } else {
                            res( rows );
                        }
                    } );
                } );
            } );

            Promise.all( promises ).then( () => {
                res.status( 200 ).send();
            }, ( error ) => {
                res.status( 400 ).send( response( error.message ) );
            } );
        }
    } );
}

function deleteOrder( request, response ) {
    db.query( queries.deleteOrder, request.params, ( error, rows ) => {
        if( error ) {
            response.status( 400 );
            response.send( error.message );
        } else {
            response.status( 200 );
            response.send();
        }
    } );
}

module.exports = ordersController;