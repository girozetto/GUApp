class TypeTask
{
    static GENERAL = 1;
    static LIFE_FEATURE = 2;
    static LIFE_SUPPORT = 3;
    static PROJECT_FEATURE = 4;
    static PROJECT_BUG = 5;
    static PROJECT_SUPPORT = 6;
    
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
    }
}

module.exports = TypeTask;