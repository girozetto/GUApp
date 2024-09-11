const { ipcMain } = require('electron');
const TaskService = require('../domain/services/taskService');
const Task = require('../domain/models/task');
const {DataResponse,DataResponseList} = require('../domain/models/dataResponse');
const TaskValidator = require('../domain/validators/taskValidator');
const { fetchQuery } = require('../domain/utils/genericUtils');

const taskService = new TaskService();

const CONTROLLER_NAME = 'task';

ipcMain.handle(`${CONTROLLER_NAME}:create`, async (event, data) => {
    
    let errors = await TaskValidator.validateProperties(data);

    if(errors) return DataResponse(errors == null, errors);

    const task = await taskService.create(new Task(
        null,
        data.title,
        data.description,
        data.idPriority,
        data.idProject, 
        data.idType, 
        data.idStatus, 
        data.idLevel,
        data.associatedIdUser,
        data.estimatedTime,
        data.associatedIdTask
    ));

    errors = !task ? 'The Task was not created' : errors;

    return DataResponse(errors == null, errors, task);
});

ipcMain.handle(`${CONTROLLER_NAME}:update`, async (event, data) => {
    
    let errors = await TaskValidator.validateProperties(data);

    if(errors) return DataResponse(errors == null, errors);

    const task = await taskService.update(data.id, new Task(
        data.id,
        data.title,
        data.description,
        data.idPriority,
        data.idProject, 
        data.idType, 
        data.idStatus, 
        data.idLevel,
        data.associatedIdUser,
        data.estimatedTime,
        data.associatedIdTask
    ));

    errors = !task ? 'The Task was not updated' : errors;

    return DataResponse(errors == null, errors, task);
});

ipcMain.handle(`${CONTROLLER_NAME}:get`, async (event, id) => {
    
    const task = await taskService.get(id);

    const errors = !task ? 'The Task was not found' : null;

    return DataResponse(errors == null, errors, task);
});

ipcMain.handle(`${CONTROLLER_NAME}:delete`, async (event, id) => {
    
    const task = await taskService.delete(id);

    const errors = !task ? 'The task was not deleted' : null;

    return DataResponse(errors == null, errors, task);
});

ipcMain.handle(`${CONTROLLER_NAME}:fetch`, async (event, queryOptions) => {

    const data = await fetchQuery(taskService.query(), queryOptions)

    return data;
    
});