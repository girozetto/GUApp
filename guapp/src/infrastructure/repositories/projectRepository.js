const BaseRepository = require("./baseRepository");
const {ProjectModel} = require("../models/tProject");

class ProjectRepository extends BaseRepository
{
    constructor()
    {
        super(ProjectModel);
    }
}

module.exports = ProjectRepository;