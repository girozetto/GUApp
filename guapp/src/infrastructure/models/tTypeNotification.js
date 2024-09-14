const { DataTypes, Model } = require('sequelize');
const sequelize = require('../contexts/sequelizeContext');  // Importa a instância do Sequelize
const TypeNotification = require('../../domain/models/typeNotification');

class TypeNotificationModel extends Model {}

TypeNotificationModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'tTypeNotifications',
    timestamps: false,
});

const findOrCreate = async ()=>{
    const notificationTypes = [
        new TypeNotification(TypeNotification.PROJECT,'Projecto'),
        new TypeNotification(TypeNotification.TASK,'Tarefa'),
        new TypeNotification(TypeNotification.USER,'Utilizador')
    ];

    for (const type of notificationTypes) {
        await TypeNotificationModel.findOrCreate({ where: { id: type.id }, defaults: type });
    }
}

module.exports = {
    TypeNotificationModel,
    findOrCreate
};
