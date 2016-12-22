let express = require( 'express' );
let db = require( './../database' );
let response = require( '../response' );

let queries = {
    getOrdersForClient: require( './get-all-for-client.sql' ),
    getOrdersForMechanic: require( './get-all-for-mechanic.sql' ),
    getOrdersForMechanicPlusClient: require( './get-all-for-client-mechanic.sql' ),
    getOrder: require( './get.sql' ),
    saveOrder: require( './save.sql' ),
    deleteOrder: require( './delete.sql' ),
    countOrders: require( './count.sql' ),
    insertOrderTask: require( './insert-order-task.sql' ),
    insertOrderPart: require( './insert-order-part.sql' ),
    cleanOrderRelations: require( './clean-relations.sql' ),

    updateState: require( './update-state.sql' ),
    createReceipt: require( './../receipts/save.sql' ),

    createJob: require( '../job/save.sql' )
};

let ordersController = express.Router();

ordersController.get( '/', getOrders );
ordersController.get( '/:id', getOrder );
ordersController.post( '/', saveOrder );
ordersController.delete( '/:id', deleteOrder );

ordersController.post( '/:id/state', updateOrderState );

function getOrders( request, response ) {
    let userID = request.session.user.access.client;
    let query = "";

    if(userID !== null){
        if(request.session.user.access.mechanic !== null) {
            // client + mechanic query
            query = queries.getOrdersForMechanicPlusClient;
            userID = request.session.user.access.mechanic;

            request.body.mechanic_id = userID;
            request.body.user_id = request.session.user.access.client;
        }
        else{
            // client only query
            query = queries.getOrdersForClient;
            userID = request.session.user.access.client;
            request.body.user_id = userID;
        }
    }
    else{
        // mechanic only query nx
        query = queries.getOrdersForMechanic;
        userID =request.session.user.mechanicId;
        request.body.mechanic_id = userID;
    }

    db.query( query,request.body, ( error, rows ) => {
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
                    let data = {
                        orderId,
                        mechanicId: req.session.user.access.mechanic
                    };

                    db.query( queries.createJob, data, (err) => {
                        if(err) {
                            res.status( 400 ).send(response(err.message));
                        } else {
                            res.status( 200 ).send();
                        }
                    });
                }
            } );
        }
    } )
}

module.exports = ordersController;