// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');

const registeredPreloads = [
    accountPreload,
    taskPreload,
    navigationPreload,
    // Add more preloads here as needed...
];

for(var preload of registeredPreloads)
{
    contextBridge.exposeInMainWorld(preload.API_NAME, preload.operations);
}