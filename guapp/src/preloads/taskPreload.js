const { PERSISTENCE, buildPreloader } = require('./basePreload');

const PRELOAD_NAME = 'task'; 

module.exports = buildPreloader(PRELOAD_NAME, PERSISTENCE(PRELOAD_NAME));