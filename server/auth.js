let userRouter = require('./users/users');
let helpers = require( './helpers' );
let db = require( './database' );
let response = require('./response');

let queries = {
    saveUser: require('./users/save.sql')
};

function login( req, res ) {
    if(req.session && req.session.user) {
        res.send(req.session.user.access);
    } else {
        let email = req.body.email;
        let password = req.body.password;

        userRouter.getUser( email ).then(( user ) => {
            if(user && user.password === password) {
                req.session.user = user;

                req.session.user.access = {
                    admin: user.adminId,
                    mechanic: user.clientId,
                    accountant: user.mechanicId,
                    client: user.accountantId
                };

                res.status( 200 ).send( req.session.user.access );
            } else {
                res.status( 401 ).send();
            }
        }).catch( (error) => res.status( 401 ).send(error.message) );
    }
}

function logout( req, res ) {
    req.session && req.session.destroy();
    res.redirect('/');
}

function checkAuth( req, res, next ) {
    if(!req.session || !req.session.user ) {
        res.status( 401 ).send();
    } else {
        next();
    }
}

function getGroupAuthMiddleware( group ) {
    return function authenticator( res, req, next ) {
        if(res.session && req.session.user && req.session.user.access) {
            if( req.session.user.access[group]) next();
        } else {
            res.status( 401 )
        }
    }
}

function register( req, res ) {
    let data = req.body;

    userRouter.getUser( data.email ).then(( user ) => {
        if(user) {
            req.status( 400 ).send(response('Toks el. paštas jau yra užregistruotas'));
        } else {
            db.query( queries.saveUser, data, ( error ) => {
                if( error ) {
                    res.status( 400 ).send(error.message);
                } else {
                    res.status( 200 ).send();
                }
            });
        }
    }).catch( ( error ) => res.status( 500 ).send(error.message) );
}

module.exports = {
    login,
    logout,
    register,

    admin: getGroupAuthMiddleware( 'admin' ),
    mechanic: getGroupAuthMiddleware( 'mechanic' ),
    accountant: getGroupAuthMiddleware( 'accountant' ),
    client: getGroupAuthMiddleware( 'client' ),
    loggedIn: checkAuth
};