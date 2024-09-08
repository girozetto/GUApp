const BaseRepository = require("./baseRepository");
const {PriorityModel} = require("../models/tPriority");

class PriorityRepository extends BaseRepository
{
    constructor()
    {
        super(PriorityModel);
    }
}

module.exports = PriorityRepository;