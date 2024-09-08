const LevelRepository = require("../../infrastructure/repositories/levelRepository");
const BaseService = require("./baseService");

class LevelService extends BaseService
{
    constructor()
    {
        super(new LevelRepository());
    }
}

module.exports = LevelService;