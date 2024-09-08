const sequelize = require('../contexts/sequelizeContext'); // Importa a instância do Sequelize
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
    Task.TaskModel.belongsTo(User.UserModel, { foreignKey: 'associatedIdUser', as: 'associatedUser' });
    Task.TaskModel.belongsTo(Task.TaskModel, { foreignKey: 'associatedIdTask', as: 'associatedTask' });

    // Relacionamentos de Notification
    Notification.NotificationModel.belongsTo(TypeNotification.TypeNotificationModel, { foreignKey: 'typeId' });

    // Relacionamentos de User
    User.UserModel.hasMany(Task.TaskModel, { foreignKey: 'associatedIdUser', as: 'tasks' });

    // Relacionamentos de Project
    Project.ProjectModel.hasMany(Task.TaskModel, { foreignKey: 'idProject' });
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

        //Type Task
        await TypeTask.findOrCreate();

        //Type Notification
        await TypeNotification.findOrCreate();

        console.log("Sincronização e inserção de dados estáticos concluída com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar e popular dados:", error);
    }
}

syncAndSeed();

module.exports = {
    syncAndSeed
};