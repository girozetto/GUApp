const { DataTypes, Model } = require('sequelize');
const sequelize = require('../contexts/sequelizeContext');

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'tUser',
    timestamps: false
});

const findOrCreate = async ()=>{

    for (const level of levels) {
        await LevelModel.findOrCreate({ where: { id: level.id }, defaults: level });
    }
}

module.exports = {UserModel, findOrCreate};
