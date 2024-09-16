//OBS: this code is too big, just because of preload scripts particularity of not being possible to load other custom scripts or custom dependencies

const { ipcRenderer, contextBridge } = require('electron');

const AUTHENTICATION = (preloadName)=>{
    return {
        login: (credentials) => ipcRenderer.invoke(`${preloadName}:login`, credentials),
        register: (data) => ipcRenderer.invoke(`${preloadName}:register`, data),
        profile: (id) => ipcRenderer.invoke(`${preloadName}:profile`, id)
    };
};

const NAVIGATION = (preloadName)=>{
    return {
        redirect: (destination)=>ipcRenderer.invoke(`${preloadName}:redirect`, destination)
    };
};

const PERSISTENCE = (preloadName)=>{
    return {
        create: (model) => ipcRenderer.invoke(`${preloadName}:create`, model),
        update: (model) => ipcRenderer.invoke(`${preloadName}:update`, model),
        fetch: (options) => ipcRenderer.invoke(`${preloadName}:fetch`, options),
        delete: (id) => ipcRenderer.invoke(`${preloadName}:delete`, id),
        get: (id) => ipcRenderer.invoke(`${preloadName}:get`, id)
    };
};

const buildAPI = (preloadName, operations) => {
    return {
        API_NAME: `${preloadName}API`, 
        operations: operations
    }
};

const registeredPreloads = [
    buildAPI('navigation', NAVIGATION('navigation')),
    buildAPI('task', PERSISTENCE('task')),
    buildAPI('account', AUTHENTICATION('account')),
    // Add more preloads here as needed...
];

for(var preload of registeredPreloads)
{
    contextBridge.exposeInMainWorld(preload.API_NAME, preload.operations);
}