const { contextBridge } = require('electron');
const { AUTHENTICATION , buildPreloader} = require('./basePreload');

const PRELOAD_NAME = 'account'; 

module.exports = buildPreloader(PRELOAD_NAME, AUTHENTICATION(PRELOAD_NAME));