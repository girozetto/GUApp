const { DataTypes, Model } = require('sequelize');
const sequelize = require('../contexts/sequelizeContext');

class NotificationModel extends Model {}

NotificationModel.init({
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
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TypeNotification',  // Relacionamento com TypeNotification
            key: 'id'
        }
    },
    objectAssociated: DataTypes.STRING,
    dateToShow: DataTypes.DATE,
    creationDate: DataTypes.DATE
}, {
    sequelize,
    modelName: 'tNotification',
    timestamps: false
});

module.exports = { NotificationModel };
