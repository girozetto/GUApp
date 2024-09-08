const BaseRepository = require("./baseRepository");
const {LevelModel} = require("../models/tLevel");

class LevelRepository extends BaseRepository
{
    constructor()
    {
        super(LevelModel);
    }
}

module.exports = LevelRepository;