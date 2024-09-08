const PriorityRepository = require("../../infrastructure/repositories/priorityRepository");
const BaseService = require("./baseService");

class PriorityService extends BaseService
{
    constructor()
    {
        super(new PriorityRepository());
    }
}

module.exports = PriorityService;