const StatusRepository = require("../../infrastructure/repositories/statusRepository");
const BaseService = require("./baseService");

class StatusService extends BaseService
{
    constructor()
    {
        super(new StatusRepository());
    }
}

module.exports = StatusService;