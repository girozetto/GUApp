const fs = require('fs');
const path = require('path');
const { MEGA_CONFIG_URL, FIREBASE_CONFIG_URL, DB_CONFIG_URL, PREFERENCES_CONFIG_URL} = require('../constants/configs')

class ConfigService
{
    constructor(){
        this.basePath = path.resolve(__dirname,"../../");

        // Construir os caminhos absolutos com base no diretório 'src'
        this.configPaths = {
            "MEGA": path.join(this.basePath, MEGA_CONFIG_URL),
            "FIREBASE": path.join(this.basePath, FIREBASE_CONFIG_URL),
            "DATABASE": path.join(this.basePath, DB_CONFIG_URL),
            "PREFERENCES": path.join(this.basePath, PREFERENCES_CONFIG_URL)
        };
    }

    getConfig(key) {
        const filePath = this.configPaths[key];

        if (!filePath) {
            throw new Error(`Configuração para a chave "${key}" não encontrada.`);
        }

        // Verifica se o arquivo existe
        if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo de configuração não encontrado: ${filePath}`);
        }

        try {
            // Lê o arquivo JSON e parseia para objeto
            const rawData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(rawData);
        } catch (error) {
            throw new Error(`Erro ao ler o arquivo de configuração: ${error.message}`);
        }
    }
    
}

module.exports = ConfigService;