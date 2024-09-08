class FluentQuery {
    constructor(model) {
        this.model = model;
        this.queryOptions = {}; // Opções de consulta do Sequelize
    }

    // Adicionar condição de filtragem
    where(conditions) {
        this.queryOptions.where = { ...this.queryOptions.where, ...conditions };
        return this;
    }

    // Pular um número de registros
    skip(count) {
        this.queryOptions.offset = count;
        return this;
    }

    // Limitar o número de registros
    take(count) {
        this.queryOptions.limit = count;
        return this;
    }

    // Ordenar os resultados
    orderBy(field, ascending = true) {
        this.queryOptions.order = [[field, ascending ? 'ASC':'DESC']];
        return this;
    }

    // Retornar o primeiro ou nulo
    async firstOrDefault() {
        return await this.model.findOne(this.queryOptions);
    }

    // Retornar todos os resultados
    async toList() {
        return await this.model.findAll(this.queryOptions);
    }
}

module.exports = FluentQuery;