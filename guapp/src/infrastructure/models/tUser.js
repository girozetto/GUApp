const User = require('../../domain/models/user')
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

    try {
        
        // Busca um usuário pelo email e, se não existir, cria um novo
        const userCount = await UserModel.count();

        if (userCount > 0) return;

        const userData = new User('Gilberto Alexandre','julbertoalexandredealmeida@gmail.com','Gilberto2024!');
        
        const [user, created] = await UserModel.findOrCreate({
            where: { email: userData.email },  // Busca por email
            defaults: userData                 // Cria com os dados fornecidos se não existir
        });

        if (created) {
            console.log(`Novo usuário criado: ${user.name}`);
        } else {
            console.log(`Usuário já existente: ${user.name}`);
        }

    } catch (error) {
        console.error('Erro ao buscar ou criar usuário:', error);
        throw error;
    }
}

module.exports = {UserModel, findOrCreate};
