const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { buildPageUrl, buildMainPageUrl } = require('./domain/utils/urlBuilder');
const { instance } = require('./domain/managers/sessionManager')
//Only sync database with actual models
const { syncAndSeed } = require('./infrastructure/contexts/sequelizeSync');

// Load IPC events
//Load controllers loader
require('./controllers/loader');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {

  await syncAndSeed();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : false,
      contextIsolation: true
    }
  });

  const activeUser = await instance.getActiveUser();
  if (activeUser) {
    mainWindow.loadFile(path.join(__dirname, buildMainPageUrl()));
  } else {
    mainWindow.loadFile(path.join(__dirname, buildPageUrl('login')));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.handle('navigation:redirect', (event, target) => {
    if (mainWindow) {
      console.log("Target Received: ", target);
      mainWindow.loadFile(path.join(__dirname, buildPageUrl(target)));
    }
  });

};

Menu.setApplicationMenu(null);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
