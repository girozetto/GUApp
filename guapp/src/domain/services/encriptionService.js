const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ConfigService = require('./configService');

const configService = new ConfigService();

class EncriptionService
{
    static generateAuthenticationToken(payloadData){
        const preferences = configService.getConfig('PREFERENCES');
        const expiresIn = preferences['token-expiration']; // described in seconds
        const secretKey = preferences['secret-key'];
        const token = jwt.sign(payloadData, secretKey, { 
            expiresIn: expiresIn
        });
        return token;
    }

    static validateAuthenticationToken(token){
        try {
            const preferences = configService.getConfig('PREFERENCES');
            const secretKey = preferences['secret-key'];
            const result = jwt.verify(token, secretKey);
            console.log('Token válido:', result);
            //Is Valid token
            return result;
        } catch (error) {
            console.error('Token inválido:', error);
            //Is Invalid Token
            return null;
        }
    }

    static async encryptPassword(plainPassword) {
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