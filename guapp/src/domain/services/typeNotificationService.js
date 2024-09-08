const TypeNotificationRepository = require("../../infrastructure/repositories/typeNotificationRepository");
const BaseService = require("./baseService");

class TypeNotificationService extends BaseService
{
    constructor()
    {
        super(new TypeNotificationRepository());
    }
}

module.exports = TypeNotificationService;