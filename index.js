require.extensions['.sql'] = require('./server/sql-reader');

let config = require( './config' );
let app = require( './server/express' );

app.listen(config.port, () => {
    console.log(`server listening at port ${config.port}`);
});
