let usersRepository = require('./users/users');

function login( req, res ) {
    if(req.session && req.session.user) {
        res.send(req.session.user.access)
    } else {
        let username = req.body.username;
        let password = req.body.password;

        usersRepository.getUser( username ).then(( user ) => {
            if(user && user.password === password) {
                req.session.user = user;

                req.session.user.access = {
                    admin: user.userGroup === 1,
                    mechanic: user.userGroup === 2,
                    accountant: user.userGroup === 3,
                    client: user.userGroup === 4
                };

                res.status( 200 ).send( req.session.user.access );
            } else {
                res.status( 401 ).send();
            }
        }).catch( res.status( 404 ).send );
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

module.exports = {
    login,
    logout,

    admin: getGroupAuthMiddleware( 'admin' ),
    mechanic: getGroupAuthMiddleware( 'mechanic' ),
    accountant: getGroupAuthMiddleware( 'accountant' ),
    client: getGroupAuthMiddleware( 'client' ),
    loggedIn: checkAuth
};