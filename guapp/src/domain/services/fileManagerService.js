class FileManagerService{
    constructor(fs, repository){
        this.fs = fs;
        this.repository = repository;
    }
}

module.exports = FileManagerService;