const BaseRepository = require("../../infrastructure/repositories/baseRepository");

class BaseService
{
    constructor(repository = new BaseRepository(null)){
        this.repository = repository
    }

    async create(entity)
    {
        try{
            return await this.repository.create(entity);
        }catch(err){
            console.error(err);
        }
        return null;
    }

    async delete(entityId)
    {
        try{
            return this.repository.create(entityId);
        }catch(err){
            console.error(err);
        }
        return null;
    }

    async update(key, entity)
    {
        try{
            return await this.repository.update(key,entity);
        }catch(err){
            console.error(err);
        }
        return null;
    }

    async getAll()
    {
        try{
            return await this.repository.getAll();
        }catch(err){
            console.error(err);
        }
        return [];
    }

    async get(key)
    {
        try{
            return await this.repository.get(key);
        }catch(err){
            console.error(err);
        }
        return null;
    }

    query()
    {
        return this.repository.query();
    }

}

module.exports = BaseService;