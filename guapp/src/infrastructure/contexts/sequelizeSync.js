const sequelize = require('../contexts/sequelizeContext');
const Level = require('../models/tLevel');
const User = require('../models/tUser');
const Priority = require('../models/tPriority');
const Status = require('../models/tStatus');
const TypeNotification = require('../models/tTypeNotification');
const TypeTask = require('../models/tTypeTask');
const Project = require('../models/tProject');
const Notification = require('../models/tNotification');
const Task = require('../models/tTask');
const { startTask, succeedTask, greenMessage, redMessage } = require('../../domain/handlers/progressHandler');

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

const entities = [
    { name: 'Levels', action: () => Level.findOrCreate() },
    { name: 'Priorities', action: () => Priority.findOrCreate() },
    { name: 'Statuses', action: () => Status.findOrCreate() },
    { name: 'Type Tasks', action: () => TypeTask.findOrCreate() },
    { name: 'Type Notifications', action: () => TypeNotification.findOrCreate() },
    { name: 'Users', action: () => User.findOrCreate() }
];


const syncAndSeed = async () => {
    try {
        let spinner = await startTask("Building relationships...");
        buildRelations();
        await succeedTask(spinner, 'Relationships built successfully.');

        spinner = await startTask('Synchronizing database...');
        await sequelize.sync({logging:false});
        await succeedTask(spinner, 'Database synchronized successfully.');
        
        for (const entity of entities) {
            spinner = await startTask(`Seeding ${entity.name}...`);
            await entity.action();
            await succeedTask(spinner, `${entity.name} seeded successfully.`);
        }

        console.log(await greenMessage("Sincronização e inserção de dados estáticos concluída com sucesso."));
    } catch (error) {
        console.error(await redMessage("Erro ao sincronizar e popular dados: "), error);
    }
}

module.exports = {
    syncAndSeed
};