let express = require( 'express' );
let db = require( './../database' );
let helpers = require( './../helpers' );
let promise = require( 'promise' );

let queries = {
    albums: require( './albums.sql' ),
    albumsByLabels: require( './albums-by-label.sql' ),
    albumsByArtists: require( './albums-by-artist.sql'),

    orders: require( './orders.sql' ),
    ordersByAlbum: require( './orders-by-album.sql' ),
    ordersByUser: require( './orders-by-user.sql' ),
    
    tracks: require( './tracks.sql' ),
    tracksByArtist: require( './tracks-by-artist.sql' ),
    tracksByGenre: require( './tracks-by-genre.sql' )
};

let reportsController = express.Router();

reportsController.post( '/orders', getAlbumsReport );
reportsController.post( '/orders', getOrdersReport );
reportsController.post( '/tracks', getTracksReport );

function getAlbumsReport( request, response ) {
    let data = {
        artist: { field: 'id', data: request.body.artist },
        recordLabel: { field: 'id', data: request.body.recordLabel }
    };

    let query = helpers.insertConditions( queries.albums, data );

    promise.all([
        toPromise( helpers.insertData( query, data ) ),
        toPromise( helpers.insertConditions( queries.albumsByLabels, data ) ),
        toPromise( helpers.insertConditions( queries.albumsByArtists, data ) )
    ]).then( responses => {
        response.send( responses );
    }, error => {
        response.status( 400 );
        response.send( error.message );
    });
}

function getOrdersReport( request, response ) {
    let data = {
        user: { field: 'id', data: request.body.user },
        album: { field: 'id', data: request.body.album }
    };

    let query = helpers.insertConditions( queries.orders, data );

    promise.all([
        toPromise( helpers.insertData( query, data ) ),
        toPromise( helpers.insertConditions( queries.ordersByAlbum, data ) ),
        toPromise( helpers.insertConditions( queries.ordersByUser, data ) )
    ]).then( responses => {
        response.send( responses );
    }, error => {
        response.status( 400 );
        response.send( error.message );
    });
}

function getTracksReport( request, response ) {
    let data = {
        genre: { field: 'id_Genre', data: request.body.genre },
        artist: { field: 'id', data: request.body.artist }
    };

    let query = helpers.insertConditions( queries.tracks, data );

    promise.all([
        toPromise( helpers.insertData( query, data ) ),
        toPromise( helpers.insertConditions( queries.tracksByArtist, data ) ),
        toPromise( helpers.insertConditions( queries.tracksByGenre, data ) )
    ]).then( responses => {
        response.send( responses );
    }, error => {
        response.status( 400 );
        response.send( error.message );
    });
}

function toPromise( query ) {
    return new promise( ( resolve, reject ) => {
        db.query( query, ( error, rows ) => {
            if ( error ) reject( error );
            else resolve( rows );
        })
    })
}

module.exports = reportsController;