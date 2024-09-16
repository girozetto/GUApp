const keytar = require('keytar');
const ConfigService = require('./configService');
const EncriptionService = require('./encriptionService');

class AuthenticationService
{
    constructor(){
        this.configService = new ConfigService();
    }

    authenticate(user)
    {
        const payload = {
          id: user.id,
          email: user.email,
          authDate: new Date().getTime()
        };
        const token = EncriptionService.generateAuthenticationToken(payload);
        return token;
    }

    isValidToken(token)
    {
        return EncriptionService.validateAuthenticationToken(token) != null;
    }

    async storeToken(account, token){
        const config = this.configService.getConfig('PREFERENCES');
        await keytar.setPassword(config['app-name'], account, token);
        return true;
    }

    async removeTokenFromStore(account){
        const config = this.configService.getConfig('PREFERENCES');
        return await keytar.deletePassword(config['app-name'], account);
    }

    async loadTokenFromStore(account){
        const config = this.configService.getConfig('PREFERENCES');
        return await keytar.getPassword(config['app-name'], account);
    }

}

module.exports = AuthenticationService;