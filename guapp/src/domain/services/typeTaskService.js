const TypeTaskRepository = require("../../infrastructure/repositories/typeTaskRepository");
const BaseService = require("./baseService");

class TypeTaskService extends BaseService
{
    constructor()
    {
        super(new TypeTaskRepository());
    }
}

module.exports = TypeTaskService;