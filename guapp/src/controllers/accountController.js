const { ipcMain } = require('electron');
const UserService = require('../domain/services/userService');
const User = require('../domain/models/user');
const DataResponse = require('../domain/models/dataResponse');
const UserValidator = require('../domain/validators/userValidator');

const userService = new UserService();

const CONTROLLER_NAME = 'account';

ipcMain.handle(`${CONTROLLER_NAME}:login`, async (event, loginData) => {
    
    let errors = UserValidator.validateProperties(loginData);

    if(errors) return DataResponse(errors == null, errors);

    const user = await userService.query().where({email:loginData.email, password:loginData.password}).firstOrDefault();

    errors = !user ? 'Invalid email or password' : errors;

    return DataResponse(errors == null, errors, user);
});

ipcMain.handle(`${CONTROLLER_NAME}:register`, async (event, registerData) => {
    
    let errors = UserValidator.validateProperties(registerData, false);

    if(errors) return DataResponse(errors == null, errors);

    const user = await userService.create(new User(null, registerData.name, registerData.email, registerData.password));

    errors = !user ? 'The User was not created' : errors;

    return DataResponse(errors == null, errors, user);
});

ipcMain.handle(`${CONTROLLER_NAME}:profile`, async (event, id) => {
    
    const user = await userService.get(id);

    const errors = !user ? 'The user was not found' : null;

    return DataResponse(errors == null, errors, user);
});