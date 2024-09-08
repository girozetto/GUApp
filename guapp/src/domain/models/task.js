class Task
{
    constructor(id,title, description, idPriority, idProject, idType, idStatus, idLevel, associatedIdUser=null, estimatedTime=null, associatedIdTask = null)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.idPriority = idPriority;
        this.idProject = idProject;
        this.estimatedTime = estimatedTime;
        this.associatedIdUser = associatedIdUser;
        this.idLevel = idLevel;
        this.idType = idType;
        this.idStatus = idStatus;
        this.associatedIdTask = associatedIdTask;
    }
    constructor(title, description, idPriority, idProject, idType, idStatus, idLevel, associatedIdUser=null, estimatedTime=null, associatedIdTask = null)
    {
        this.id = null; // Apenas para criação, o ID será gerado automaticamente
        this.title = title;
        this.description = description;
        this.idPriority = idPriority;
        this.idProject = idProject;
        this.estimatedTime = estimatedTime;
        this.associatedIdUser = associatedIdUser;
        this.idLevel = idLevel;
        this.idType = idType;
        this.idStatus = idStatus;
        this.associatedIdTask = associatedIdTask;
    }
}

module.exports = Task;