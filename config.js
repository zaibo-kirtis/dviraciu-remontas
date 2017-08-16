let config = {
    port: process.env.PORT || 11002,
    staticDir: 'build',
    rootDir: __dirname,

    mysql: {
        host: 'localhost',
        database: 'dviraciai',
        user: 'dvi',
        password: 'dvi',
        multipleStatements: true
    },

    favicon: 'bike.ico',

    js: [ './app/app.js' ],
    index: [ './app/index.html' ],
    html: [ './app/**/*.html', '!./app/index.html' ],
    libs: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.min.js'
    ],

    templateCache: {
        standalone: true,
        transformUrl: function (url) {
            return url.match(/[^\/]*\.html$/)[0];
        }
    }
};

module.exports = config;
