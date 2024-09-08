
class User{

    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    constructor(name, email, password){
        this.id = null; // Apenas para criação, o ID será gerado automaticamente
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;