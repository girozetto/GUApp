const { DataTypes, Model } = require('sequelize');
const Priority = require('../../domain/models/priority');
const sequelize = require('../contexts/sequelizeContext');  // Importa a instância do Sequelize

class PriorityModel extends Model {}

PriorityModel.init({
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
    modelName: 'tPriorities',
    timestamps: false,
});

const findOrCreate = async ()=>{
    const priorities = [
        new Priority(Priority.LOW,'Baixa'),
        new Priority(Priority.MEDIUM_LOW,'Média Baixa'),
        new Priority(Priority.MEDIUM,'Média'),
        new Priority(Priority.MEDIUM_HIGH,'Média Alta'),
        new Priority(Priority.HIGH,'Alta')
    ];

    for (const priority of priorities) {
        await PriorityModel.findOrCreate({ where: { id: priority.id }, defaults: priority });
    }
}

module.exports = {
    PriorityModel,
    findOrCreate
};
