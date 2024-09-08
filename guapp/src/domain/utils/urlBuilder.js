const { SQLITE } = require("../constants/dbtypes");

const buildDbUrl = (dbtype, dbname, user = null, password = null, host = null, port = null) => {
    
    const credentials = user && password ? `${user}:${password}@` : '';
    const connectionAddress = host && port ? `${host}:${port}/` : '';

    return `${dbtype}://${credentials}${connectionAddress}${dbname}`;
}

module.exports = {
    buildDbUrl
};