const { ipcMain } = require('electron');
const UserService = require('../domain/services/userService');
const User = require('../domain/models/user');
const { DataResponse } = require('../domain/models/dataResponse');
const UserValidator = require('../domain/validators/userValidator');
const EncriptionService = require('../domain/services/encriptionService');
const {instance} = require('../domain/managers/sessionManager');

const userService = new UserService();
const sessionManager = instance;

const CONTROLLER_NAME = 'account';

ipcMain.handle(`${CONTROLLER_NAME}:login`, async (event, loginData) => {
    
    let errors = await UserValidator.validateProperties(loginData);

    if(errors) return DataResponse(errors == null, errors);

    const user = await userService.query().where({email:loginData.email}).firstOrDefault();

    console.log("Logged User:",user);
    errors = !user || !await EncriptionService.isPasswordMatch(loginData.password, user.password) ? 'Invalid email or password' : errors;

    if(!errors) await sessionManager.createSession(user);

    return DataResponse(errors == null, errors, user);
});

ipcMain.handle(`${CONTROLLER_NAME}:register`, async (event, registerData) => {
    
    let errors =  await UserValidator.validateProperties(registerData, false);

    if(errors) return DataResponse(errors == null, errors);

    const user = await userService.create(new User(null, registerData.name, registerData.email, registerData.password));

    errors = !user ? 'The User was not created' : errors;

    return DataResponse(errors == null, errors, user);
});

ipcMain.handle(`${CONTROLLER_NAME}:logout`, async (event) => {
    const user = await sessionManager.getActiveUser();
    await sessionManager.removeSession(user);
    return DataResponse(true, null);
});

ipcMain.handle(`${CONTROLLER_NAME}:profile`, async (event) => {
    const user = await sessionManager.getActiveUser();
    const errors = !user ? 'The user was not found' : null;
    return DataResponse(errors == null, errors, user);
});