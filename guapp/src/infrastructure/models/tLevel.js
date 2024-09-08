const { DataTypes, Model } = require('sequelize');
const Level = require('../../domain/models/level');
const sequelize = require('../contexts/sequelizeContext');  // Importa a instância do Sequelize

class LevelModel extends Model {}

LevelModel.init({
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
    modelName: 'tLevel',
    timestamps: false,
});

const findOrCreate = async ()=>{
    const levels = [
        new Level(Level.TRAINEE, 'Estagiário'),
        new Level(Level.JUNIOR, 'Júnior'),
        new Level(Level.ASSOCIATED, 'Associado'),
        new Level(Level.NORMAL, 'Normal'),
        new Level(Level.DEVELOPER, 'Desenvolvedor'),
        new Level(Level.SENIOR_DEVELOPER, 'Desenvolvedor Sénior')
    ];

    for (const level of levels) {
        await LevelModel.findOrCreate({ where: { id: level.id }, defaults: level });
    }
}

module.exports = {
    LevelModel,
    findOrCreate
};
