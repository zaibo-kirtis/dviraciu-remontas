let fs = require('fs');

function sqlReader(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf-8');
}

module.exports = sqlReader;