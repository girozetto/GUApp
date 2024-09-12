const { ipcRenderer } = require('electron');

const AUTHENTICATION = (preloadName)=>{
    return {
        login: (credentials) => ipcRenderer.invoke(`${preloadName}:login`, credentials),
        register: (data) => ipcRenderer.invoke(`${preloadName}:register`, data),
        profile: (id) => ipcRenderer.invoke(`${preloadName}:profile`, id)
    };
};

const NAVIGATION = ()=>{
    return {
        redirect: (destination)=>ipcRenderer.send('navigation:redirect', destination)
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

module.exports = {
    PERSISTENCE,
    AUTHENTICATION,
    NAVIGATION,
    buildPreloader: (preloadName, operations) => {
        return {
            API_NAME: `${preloadName}API`, 
            operations: operations
        }
    }
};