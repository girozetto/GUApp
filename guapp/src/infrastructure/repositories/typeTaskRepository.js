const BaseRepository = require("./baseRepository");
const {TypeTaskModel} = require("../models/tTypeTask");

class TypeTaskRepository extends BaseRepository
{
    constructor()
    {
        super(TypeTaskModel);
    }
}

module.exports = TypeTaskRepository;