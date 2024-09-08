class Priority
{
    static LOW = 1;
    static MEDIUM_LOW = 2;
    static MEDIUM = 3;
    static MEDIUM_HIGH = 4;
    static HIGH = 5;
    
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

module.exports = Priority;