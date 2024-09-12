const UserRepository = require("../../infrastructure/repositories/userRepository");
const BaseService = require("./baseService");
const EncriptionService = require("./encriptionService");

class UserService extends BaseService
{
    constructor()
    {
        super(new UserRepository());
    }

    async create(entity)
    {
        entity.password = await EncriptionService.encryptPassword(entity.password);
        return super.create(entity);
    }
}

module.exports = UserService;