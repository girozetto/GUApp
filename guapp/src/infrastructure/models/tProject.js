const { DataTypes, Model } = require('sequelize');
const sequelize = require('../contexts/sequelizeContext');

class ProjectModel extends Model {}

ProjectModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    sequelize,
    modelName: 'tProject',
    timestamps: false
});

module.exports = {ProjectModel};