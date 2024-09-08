const { DataTypes, Model } = require('sequelize');
const sequelize = require('../contexts/sequelizeContext');  // Importa a instância do Sequelize
const TypeTask = require('../../domain/models/typeTask');

class TypeTaskModel extends Model {}

TypeTaskModel.init({
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
    modelName: 'tTypeTask',
    timestamps: false,
});

const findOrCreate = async ()=>{
    const taskTypes = [
        new TypeTask(TypeTask.GENERAL,'Geral'),
        new TypeTask(TypeTask.LIFE_FEATURE,'Feature da Vida'),
        new TypeTask(TypeTask.LIFE_SUPPORT,'Support da Vida'),
        new TypeTask(TypeTask.PROJECT_BUG,'Bug de Projeto'),
        new TypeTask(TypeTask.PROJECT_FEATURE,'Feature de Projeto'),
        new TypeTask(TypeTask.PROJECT_SUPPORT,'Support de Projeto')
    ];

    for (const type of taskTypes) {
        await TypeTaskModel.findOrCreate({ where: { id: type.id }, defaults: type });
    }
}

module.exports = {
    TypeTaskModel, 
    findOrCreate
};