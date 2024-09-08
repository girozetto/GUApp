class Status
{
    static OPENED = 1;
    static IN_PROGRESS = 2;
    static UNSOLVED = 3;
    static FINISHED = 4;
    static IN_AVALIATION = 5;
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
    }
}

module.exports = Status;