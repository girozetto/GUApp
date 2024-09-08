class Notification
{
    constructor(id,title, description,idUser,idType,objectAssociated, dateToShow, creationDate)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.idType = idType;
        this.idUser = idUser;
        this.objectAssociated = objectAssociated;
        this.dateToShow = dateToShow;
        this.creationDate = creationDate;
    }
    constructor(title, description,idUser,idType,objectAssociated, dateToShow, creationDate)
    {
        this.id = null; // Apenas para criação, o ID será gerado automaticamente
        this.title = title;
        this.description = description;
        this.idType = idType;
        this.idUser = idUser;
        this.objectAssociated = objectAssociated;
        this.dateToShow = dateToShow;
        this.creationDate = creationDate;
    }
}

module.exports = Notification;