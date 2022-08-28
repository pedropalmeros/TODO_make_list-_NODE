const fs = require('fs');
const archivo = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(archivo, data);
}

const leerDB = () => {
    if( !fs.existsSync(archivo)){
        return null;
    }

    return JSON.parse(fs.readFileSync( archivo,'utf-8'));
}

module.exports = { 
    guardarDB,
    leerDB
}