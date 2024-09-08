const { NotificationModel } = require("../models/tNotification");
const BaseRepository = require("./baseRepository");

class NotificationRepository extends BaseRepository
{
    constructor()
    {
        super(NotificationModel)
    }
}

module.exports = NotificationRepository;