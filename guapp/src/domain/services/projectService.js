const BaseService = require("./baseService");
const ProjectRepository = require("../../infrastructure/repositories/projectRepository");

class ProjectService extends BaseService
{
    constructor()
    {
        super(new ProjectRepository());
    }
}

module.exports = ProjectService;