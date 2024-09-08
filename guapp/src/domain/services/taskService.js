const TaskRepository = require("../../infrastructure/repositories/taskRepository");
const BaseService = require("./baseService");

class TaskService extends BaseService
{
    constructor()
    {
        super(new TaskRepository());
    }
}

module.exports = TaskService;