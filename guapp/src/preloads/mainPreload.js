// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');
const accountPreload = require('./accountPreload');
const taskPreload = require('./taskPreload');
const navigationPreload = require('./navigationPreload');

const registeredPreloads = [
    accountPreload,
    taskPreload,
    navigationPreload,
    // Add more preloads here as needed...
];

console.log('Account API Loaded: ', accountPreload);
console.log('Task API Loaded: ', taskPreload);
console.log('Navigation API Loaded: ', navigationPreload);

for(var preload of registeredPreloads)
{
    contextBridge.exposeInMainWorld(preload.API_NAME, preload.operations);
}