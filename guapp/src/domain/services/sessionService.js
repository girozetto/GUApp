const fs = require('fs');
const path = require('path');
const ConfigService = require('./configService');

class SessionService
{
    constructor()
    {
        this.basePath = path.resolve(__dirname,"../../");
        this.configService = new ConfigService();
    }

    getSessions()
    {
        const config = this.configService.getConfig('PREFERENCES');
        const sessionsFilePath = path.join(this.basePath, config['app-sessions-path']);

        if (fs.existsSync(sessionsFilePath)) return JSON.parse(fs.readFileSync(sessionsFilePath, 'utf8'));
        
        return [];
    }

    saveSessions(sessions)
    {
        if(!Array.isArray(sessions)) return;
        
        const config = this.configService.getConfig('PREFERENCES');
        const sessionsFilePath = path.join(this.basePath, config['app-sessions-path']);

        // Garante que o diretório existe antes de escrever o arquivo
        const directory = path.dirname(sessionsFilePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions));
    }

}

module.exports = SessionService;