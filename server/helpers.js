let helpers = {
    insertData: ( query, object ) => {
        for( let property in object ) {
            object[ property ] = object[ property ] || null;

            if(typeof(object[property]) === 'string') {
                object[property] = preventInjection(object[property]);
            }
        }

        query = query
            .replace( /'{(\w*)}'/g, ( match, key ) => object[ key ] ? `'${object[ key ]}'` : null )
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
    return str.replace(/['"\b\n\r\t\\%_]/g, '');
}

module.exports = helpers;