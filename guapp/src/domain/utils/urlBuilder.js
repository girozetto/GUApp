const { VIEW_TEMPLATE_URL, MAIN_TEMPLATE_URL } = require("../constants/configs");
const { SQLITE } = require("../constants/dbtypes");

const buildDbUrl = (dbtype, dbname, user = null, password = null, host = null, port = null, sslMode = null) => {
    
    const credentials = user && password ? `${user}:${password}@` : '';
    const connectionAddress = host && port ? `${host}:${port}/` : '';
    const sslType = sslMode ? `?ssl-mode=${sslMode}` : '';

    return `${dbtype}://${credentials}${connectionAddress}${dbname}${sslType}`;
}

const buildPageUrl = (view) => VIEW_TEMPLATE_URL.replace("{view}", view);


const buildMainPageUrl = () => MAIN_TEMPLATE_URL;


module.exports = {
    buildDbUrl,
    buildPageUrl,
    buildMainPageUrl
};