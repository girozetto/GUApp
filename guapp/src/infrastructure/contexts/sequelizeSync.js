const sequelize = require('../contexts/sequelizeContext');
const Level = require('../models/tLevel');
const Task = require('../models/tTask');
const User = require('../models/tUser');
const Project = require('../models/tProject');
const Notification = require('../models/tNotification');
const Priority = require('../models/tPriority');
const Status = require('../models/tStatus');
const TypeNotification = require('../models/tTypeNotification');
const TypeTask = require('../models/tTypeTask');

const buildRelations = ()=>{
    // Relacionamentos de Task
    Task.TaskModel.belongsTo(Project.ProjectModel, { foreignKey: 'idProject' });
    Task.TaskModel.belongsTo(Priority.PriorityModel, { foreignKey: 'idPriority' });
    Task.TaskModel.belongsTo(Status.StatusModel, { foreignKey: 'idStatus' });
    Task.TaskModel.belongsTo(Level.LevelModel, { foreignKey: 'idLevel' });
    Task.TaskModel.belongsTo(TypeTask.TypeTaskModel, { foreignKey: 'idType' });
    Task.TaskModel.belongsTo(User.UserModel, { foreignKey: 'associatedIdUser', as: 'associatedUser' });
    Task.TaskModel.belongsTo(Task.TaskModel, { foreignKey: 'associatedIdTask', as: 'associatedTask' });

    // Relacionamentos de Notification
    Notification.NotificationModel.belongsTo(TypeNotification.TypeNotificationModel, { foreignKey: 'idType' });
    Notification.NotificationModel.belongsTo(User.UserModel, { foreignKey: 'idUser' });

    // Relacionamentos de User
    User.UserModel.hasMany(Task.TaskModel, { foreignKey: 'associatedIdUser', as: 'tasks' });
    User.UserModel.hasMany(Notification.NotificationModel, { foreignKey: 'idUser', as: 'notifications' });

    // Relacionamentos de Project
    Project.ProjectModel.hasMany(Task.TaskModel, { foreignKey: 'idProject' });

    // Relacionamentos de Priority
    Priority.PriorityModel.hasMany(Task.TaskModel, { foreignKey: 'idPriority' });

    // Relacionamentos de Level
    Level.LevelModel.hasMany(Task.TaskModel, { foreignKey: 'idLevel' });

    // Relacionamentos de TypeTask
    TypeTask.TypeTaskModel.hasMany(Task.TaskModel, { foreignKey: 'idType' });

    // Relacionamentos de Status
    Status.StatusModel.hasMany(Task.TaskModel, { foreignKey: 'idStatus' });

    // Relacionamentos de TypeNotification
    TypeNotification.TypeNotificationModel.hasMany(Notification.NotificationModel, { foreignKey: 'idType' });
};


const syncAndSeed = async () => {
    try {
        
        buildRelations();

        // Sincroniza o banco de dados
        await sequelize.sync({ alter: true });
        
        //LEVELS
        await Level.findOrCreate();

        //PRIORITIES
        await Priority.findOrCreate();

        //STATUSES
        await Status.findOrCreate();

        //TYPE TASK
        await TypeTask.findOrCreate();

        //TYPE NOTIFICATION
        await TypeNotification.findOrCreate();

        //USER
        await User.findOrCreate();

        console.log("Sincronização e inserção de dados estáticos concluída com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar e popular dados:", error);
    }
}

syncAndSeed();

module.exports = {
    syncAndSeed
};