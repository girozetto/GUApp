const { NAVIGATION, buildPreloader } = require("./basePreload");

const PRELOAD_NAME = 'account';

module.exports = buildPreloader(PRELOAD_NAME, NAVIGATION);