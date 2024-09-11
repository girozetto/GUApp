const { contextBridge, ipcRenderer } = require('electron');

const PRELOAD_NAME = 'account'; 

contextBridge.exposeInMainWorld('accountAPI', {
    login: (credentials) => ipcRenderer.invoke(`${PRELOAD_NAME}:login`, credentials),
    register: (user) => ipcRenderer.invoke(`${PRELOAD_NAME}:register`, user),
    profile: (id) => ipcRenderer.invoke(`${PRELOAD_NAME}:profile`, id)
});