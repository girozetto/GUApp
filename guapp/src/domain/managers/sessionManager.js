const { session } = require('electron');
const SessionService = require('../services/sessionService');
const AuthenticationService = require('../services/authenticationService');

class SessionManager
{
    constructor()
    {
        this.sessionService = new SessionService();
        this.authenticationService = new AuthenticationService();
        this.sessions = [];
        this.#loadSessions();
    }

    async createSession(user)
    {
        const token = this.authenticationService.authenticate(user);
        await this.authenticationService.storeToken(user.email, token);
        this.#addSession(user.email);
    }

    #removeActiveSession(userId) {
        this.sessions = this.sessions.filter(id => id !== userId);
        this.#saveSessions();
      }

    async removeSession(userId)
    {
        try {
            await this.authenticationService.removeTokenFromStore(userId);
            this.#removeActiveSession(userId); // Remove o usuário da lista de ativos
            console.log(`Sessão removida para o usuário ${userId}`);
          } catch (error) {
            console.error('Erro ao remover a sessão:', error);
          }
    }

    #loadSessions()
    {
        this.sessions = this.sessionService.getSessions();
    }

    // Recupera o token de um usuário
  async #getSession(userId) {
    try {
      const token = await this.authenticationService.loadTokenFromStore(userId);
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token de sessão:', error);
      return null;
    }
  }

    #saveSessions()
    {
        this.sessionService.saveSessions(this.sessions);
    }

    #addSession(userId) {
        if (!this.sessions.includes(userId)) {
          this.sessions.push(userId);
          this.#saveSessions();
        }
    }

    async getActiveUser() {

        for (const userId of this.sessions) {
            const token = await this.#getSession(userId);
            if (token) {
                const isValid = this.authenticationService.isValidToken(token);
                if (isValid) {
                    return userId; // Retorna os dados do usuário ativo
                }
            }
        }

        return null; // Nenhum usuário com sessão ativa
    }
}

const instance = new SessionManager();

module.exports = {
    instance,
    SessionManager
};