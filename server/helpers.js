let helpers = {
    insertData: ( query, object ) => {
        for( let property in object ) {
            object[ property ] = object[ property ] || null;
        }

        query = query
            .replace( /'{(\w*)}'/g, ( match, key ) => object[ key ] ? `'${preventInjection(object[ key ])}'` : null )
            .replace( /{(\w*)}/g, ( match, key ) => object[ key ] || null );

        console.log(query);
        return query;
    },

    insertConditions: ( query, data ) => {
        let conditions = Object.keys( data )
            .filter( key => data[key].data )
            .map( key => `${key}s.${data[ key ].field} = ${data[ key ].data}` )
            .join( ' and ' );

        return query.replace( '[where]', conditions ? ` where ${conditions}` : '' );
    }
};

function preventInjection(str) {
    if(typeof(str) !== 'string') {
        return str;
    } else {
        return str.replace(/['"\b\n\r\t\\%_]/g, '');
    }
}

module.exports = helpers;