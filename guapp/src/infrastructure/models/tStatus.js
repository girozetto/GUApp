const { DataTypes, Model } = require('sequelize');
const Status = require('../../domain/models/status');
const sequelize = require('../contexts/sequelizeContext');  // Importa a instância do Sequelize

class StatusModel extends Model {}

StatusModel.init({
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
    modelName: 'tStatuses',
    timestamps: false,
});

const findOrCreate = async ()=>{
    const statuses = [
        new Status(Status.UNSOLVED,'Não Resolvido'),
        new Status(Status.OPENED,'Aberto'),
        new Status(Status.IN_AVALIATION,'Em Avaliação'),
        new Status(Status.IN_PROGRESS,'Em Progresso'),
        new Status(Status.FINISHED,'Terminado')
    ];

    for (const status of statuses) {
        await StatusModel.findOrCreate({ where: { id: status.id }, defaults: status });
    }
}

module.exports = {
    StatusModel,
    findOrCreate
};
