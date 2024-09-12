const UserRepository = require("../../infrastructure/repositories/userRepository");
const BaseService = require("./baseService");
const EncriptionService = require("./encriptionService");

class UserService extends BaseService
{
    constructor()
    {
        super(new UserRepository());
    }

    create(entity)
    {
        entity.password = EncriptionService.encryptPassword(entity.password);
        return super.create(entity);
    }
}

module.exports = UserService;