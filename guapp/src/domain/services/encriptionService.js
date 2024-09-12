const bcrypt = require('bcrypt');
const ConfigService = require('./configService');

class EncriptionService
{
    static async encryptPassword(plainPassword) {
        const configService = new ConfigService();
        const config = configService.getConfig("PREFERENCES");
        const hashedPassword = await bcrypt.hash(plainPassword, config['encryption-level']);
        return hashedPassword;
    }

    static async isPasswordMatch(plainPassword, hashedPassword) {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }
}

module.exports = EncriptionService;