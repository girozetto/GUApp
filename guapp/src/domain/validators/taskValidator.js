const PriorityService = require('../services/priorityService');
const ProjectService = require('../services/projectService');
const LevelService = require('../services/levelService');
const TypeTaskService = require('../services/typeTaskService');
const StatusService = require('../services/statusService');
const UserService = require('../services/userService');
const TaskService = require('../services/taskService');

const priorityService = new PriorityService();
const projectService = new ProjectService();
const levelService = new LevelService();
const typeTaskService = new TypeTaskService();
const statusService = new StatusService();
const userService = new UserService();
const taskService = new TaskService();

const validateProperties = async (task) => {

    if (task.id && !(await taskService.get(task.id))) return 'Id is required';

    if (!task.title) return 'Title is required';
    else if(typeof task.title !== 'string') return 'Invalid Title';

    if (!task.description) return 'Description is required';
    else if(typeof task.description !== 'string') return 'Invalid Description';

    if (!task.idPriority) return 'Priority is required';
    else if(!(await priorityService.get(task.idPriority))) return 'Invalid Priority';

    if (!task.idProject) return 'Project is required';
    else if(!(await projectService.get(task.idProject))) return 'Invalid Project';

    if (!task.idLevel) return 'Level is required';
    else if(!(await levelService.get(task.idLevel))) return 'Invalid Level';

    if (!task.idType) return 'Type is required';
    else if(!(await typeTaskService.get(task.idType))) return 'Invalid Type';

    if (!task.idStatus) return 'Status is required';
    else if(!(await statusService.get(task.idStatus))) return 'Invalid Status';

    if (task.estimatedTime && typeof task.estimatedTime!== 'number') return 'Invalid estimated time';

    if (task.associatedIdUser && !(await userService.get(task.associatedIdUser))) return 'Invalid Associated User';

    if (task.associatedIdTask && !(await taskService.get(task.associatedIdTask))) return 'Invalid Associated Task';

    return null;
};

module.exports = {
    validateProperties
};