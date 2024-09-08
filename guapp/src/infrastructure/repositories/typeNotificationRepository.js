const BaseRepository = require("./baseRepository");
const { TypeNotificationModel } = require("../models/tTypeNotification");

class TypeNotificationRepository extends BaseRepository
{
    constructor()
    {
        super(TypeNotificationModel);
    }
}

module.exports = TypeNotificationRepository;