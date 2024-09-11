const { contextBridge, ipcRenderer } = require('electron');

const PRELOAD_NAME = 'task'; 

contextBridge.exposeInMainWorld('taskAPI', {
    create: (task) => ipcRenderer.invoke(`${PRELOAD_NAME}:create`, task),
    update: (task) => ipcRenderer.invoke(`${PRELOAD_NAME}:update`, task),
    fetch: (options) => ipcRenderer.invoke(`${PRELOAD_NAME}:fetch`, options),
    delete: (id) => ipcRenderer.invoke(`${PRELOAD_NAME}:delete`, id),
    get: (id) => ipcRenderer.invoke(`${PRELOAD_NAME}:get`, id)
});