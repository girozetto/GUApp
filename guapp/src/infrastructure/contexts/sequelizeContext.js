const { Sequelize } = require('sequelize');

const ConfigService = require('../../domain/services/configService');

const { SQLITE } = require('../../domain/constants/dbtypes');

const { buildDbUrl } = require('../../domain/utils/urlBuilder');

const getDatabaseConfig = () =>{
    const service = new ConfigService();
    return service.getConfig('DATABASE');
};

// Função para inicializar o Sequelize com base na URL do banco de dados
const initSequelize = () => {
    const config = getDatabaseConfig();

    if (!config) {
        throw new Error('Configuração do banco de dados não encontrada.');
    }

    console.log("Configurações da Base de Dados: ", config);
    
    if (config['type'] == SQLITE) {

        // Configuração para SQLite
        return new Sequelize({
            dialect: config['type'],
            logging: config['logging'],
            storage: `./${config['database']}`, // Caminho para o arquivo SQLite
        });

    } else {
        const databaseUrl = buildDbUrl(
            config['type'], 
            config['database'], 
            config['user'], 
            config['password'], 
            config['host'], 
            config['port']
        );

        return new Sequelize(databaseUrl, {
            dialect: config['type'],
        });
    }
}

const sequelize = initSequelize();

module.exports = sequelize;
