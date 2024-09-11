const { VIEW_TEMPLATE_URL } = require("../constants/configs");
const { SQLITE } = require("../constants/dbtypes");

const buildDbUrl = (dbtype, dbname, user = null, password = null, host = null, port = null) => {
    
    const credentials = user && password ? `${user}:${password}@` : '';
    const connectionAddress = host && port ? `${host}:${port}/` : '';

    return `${dbtype}://${credentials}${connectionAddress}${dbname}`;
}

const buildPageUrl = (view) => {
    return VIEW_TEMPLATE_URL.replace("{view}", view);
}

module.exports = {
    buildDbUrl,
    buildPageUrl
};