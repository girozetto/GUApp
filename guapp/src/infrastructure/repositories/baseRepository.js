const FluentQuery = require("../contexts/fluentQuery");

class BaseRepository {
    constructor(model) {
        this.model = model; // Model Sequelize injetado (ex: User)
    }

    // Criar uma nova entidade
    async create(data) {
        return await this.model.create(data);
    }

    // Deletar uma entidade pelo ID
    async delete(id) {
        const entity = await this.model.findByPk(id);
        if (entity) {
            await entity.destroy();
            return entity;
        }
        return null;
    }

    // Atualizar uma entidade pelo ID
    async update(key, data) {
        const entity = await this.model.findByPk(key);
        if (entity) {
            return await entity.update(data);
        }
        return null;
    }

    // Retornar todas as entidades
    async getAll() {
        return await this.model.findAll();
    }

    // Retornar uma entidade pelo ID
    async get(key) {
        return await this.model.findByPk(key);
    }

    // Implementação de consultas fluentes usando Sequelize
    query() {
        return new FluentQuery(this.model);
    }
}

module.exports = BaseRepository;