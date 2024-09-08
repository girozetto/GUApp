class Project
{
    constructor(id,name, description, startDate, endDate = null)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    constructor(name, description, startDate, endDate = null)
    {
        this.id = null;  // Apenas para criação, o ID será gerado automaticamente
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

module.exports = Project;