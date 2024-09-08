const {UserModel} = require("../models/tUser");
const BaseRepository = require("./baseRepository");

class UserRepository extends BaseRepository
{
    constructor()
    {
        super(UserModel);
    }
}

module.exports = UserRepository;