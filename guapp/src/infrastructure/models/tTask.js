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
            model: 'tPriority',  // Relacionamento com Priority
            key: 'id'
        }
    },
    idProject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tProject',  // Relacionamento com Project
            key: 'id'
        }
    },
    idType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tTypeTask',  // Relacionamento com Project
            key: 'id'
        }
    },
    idStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tStatus',  // Relacionamento com Status
            key: 'id'
        }
    },
    idLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tLevel',  // Relacionamento com Level
            key: 'id'
        }
    },
    associatedIdUser: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tUser',  // Relacionamento com User
            key: 'id'
        }
    },
    estimatedTime: DataTypes.INTEGER,
    associatedIdTask: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tTask',  // Auto-referência para Task
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'tTask',
    timestamps: false
});

module.exports = { TaskModel };
