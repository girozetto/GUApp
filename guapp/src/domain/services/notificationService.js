const NotificationRepository = require("../../infrastructure/repositories/notificationRepository");
const BaseService = require("./baseService");

class NotificationService extends BaseService
{
    constructor()
    {
        super(new NotificationRepository());
    }
}

module.exports = NotificationService;