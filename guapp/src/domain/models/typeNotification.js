class TypeNotification
{
    static TASK = 1;
    static USER = 2;
    static PROJECT = 3;
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
    }
}

module.exports = TypeNotification;