const { DataTypes, Model } = require('sequelize');
const sequelize = require('../contexts/sequelizeContext');

class TaskModel extends Model {}

TaskModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    idPriority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tPriorities',  // Relacionamento com Priority
            key: 'id'
        }
    },
    idProject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tProjects',  // Relacionamento com Project
            key: 'id'
        }
    },
    idType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tTypeTasks',  // Relacionamento com Project
            key: 'id'
        }
    },
    idStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tStatuses',  // Relacionamento com Status
            key: 'id'
        }
    },
    idLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tLevels',  // Relacionamento com Level
            key: 'id'
        }
    },
    associatedIdUser: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tUsers',  // Relacionamento com User
            key: 'id'
        }
    },
    estimatedTime: DataTypes.INTEGER,
    associatedIdTask: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tTasks',  // Auto-referência para Task
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'tTasks',
    timestamps: false
});

module.exports = { TaskModel };
