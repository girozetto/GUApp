const { TaskModel } = require("../models/tTask");
const BaseRepository = require("./baseRepository");

class TaskRepository extends BaseRepository
{
    constructor()
    {
        super(TaskModel);
    }
}

module.exports = TaskRepository;