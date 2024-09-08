const UserRepository = require("../../infrastructure/repositories/userRepository");
const BaseService = require("./baseService");

class UserService extends BaseService
{
    constructor()
    {
        super(new UserRepository());
    }
}

module.exports = UserService;