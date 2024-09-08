const BaseRepository = require("./baseRepository");
const {StatusModel} = require("../models/tStatus");

class StatusRepository extends BaseRepository
{
    constructor()
    {
        super(StatusModel);
    }
}

module.exports = StatusRepository;