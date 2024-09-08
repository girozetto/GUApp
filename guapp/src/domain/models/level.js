class Level
{
    static TRAINEE = 1;
    static JUNIOR = 2;
    static ASSOCIATED = 3;
    static NORMAL = 4;
    static DEVELOPER = 5;
    static SENIOR_DEVELOPER = 6;

    constructor(id, name)
    {
        this.id = id;
        this.name = name;
    }
}

module.exports = Level;