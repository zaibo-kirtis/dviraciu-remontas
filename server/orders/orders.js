let express = require( 'express' );
let db = require( './../database' );
let response = require( '../response' );

let queries = {
    getOrders: require( './get-all.sql' ),
    getOrder: require( './get.sql' ),
    saveOrder: require( './save.sql' ),
    deleteOrder: require( './delete.sql' ),
    countOrders: require( './count.sql' ),
    insertOrderTask: require( './insert-order-task.sql' ),
    insertOrderPart: require( './insert-order-part.sql' ),
    cleanOrderRelations: require( './clean-relations.sql' ),

    updateState: require( './update-state.sql' ),
    createReceipt: require( './../receipts/save.sql' )
};

let ordersController = express.Router();

ordersController.get( '/', getOrders );
ordersController.get( '/:id', getOrder );
ordersController.post( '/', saveOrder );
ordersController.delete( '/:id', deleteOrder );

ordersController.post( '/:id/state', updateOrderState );

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
                order.parts = rows[ 2 ].map( row => row.id );

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
            let orderId = rows[ 1 ][ 0 ].orderId || data.id;
            data.tasks = data.tasks || [];
            data.parts = data.parts || [];

            let promises = [];

            promises.push( new Promise( ( res, rej ) => {
                db.query( queries.cleanOrderRelations, { orderId }, ( err ) => {
                    if( err ) {
                        rej( err );
                    } else {
                        res();
                    }
                } )
            } ) );

            promises = promises.concat( data.tasks.map( taskId => {
                return new Promise( ( res, rej ) => {
                    db.query( queries.insertOrderTask, { taskId, orderId }, ( error, rows ) => {
                        if( error ) {
                            rej( error );
                        } else {
                            res( rows );
                        }
                    } );
                } );
            } ) );

            promises = promises.concat( data.parts.map( partId => {
                return new Promise( ( res, rej ) => {
                    db.query( queries.insertOrderPart, { partId, orderId }, ( error, rows ) => {
                        if( error ) {
                            rej( error );
                        } else {
                            res( rows );
                        }
                    } );
                } );
            } ) );

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

function updateOrderState( req, res ) {
    let orderId = req.params.id;

    db.query( queries.getOrder, { id: orderId }, ( error, rows ) => {
        if( error ) {
            res.status( 400 );
            res.send( error.message );
        } else {
            let currentState = parseInt( rows[ 0 ][ 0 ].orderStateId );
            let newState = parseInt( req.query.to );

            if( newState - currentState !== 1 ) {
                res.status( 400 );
                res.send( response( `Invalid state change from ${currentState} to ${newState}` ) );
                return;
            }

            db.query( queries.updateState, { id: orderId, orderStateId: newState }, ( error, rows ) => {
                if( error ) {
                    res.status( 400 );
                    res.send( response( `Could not change state from ${currentState} to ${newState}` ) );
                    return;
                }

                if( newState === 3 ) {
                    db.query( queries.createReceipt, { orderId }, ( error, rows ) => {
                        if( error ) {
                            res.status( 400 );
                            res.send( response( 'Could not create receipt for order' ) );
                            return;
                        }

                        res.status( 200 ).send( rows );
                    } )
                } else {
                    res.status( 200 ).send();
                }
            } );
        }
    } )
}

module.exports = ordersController;