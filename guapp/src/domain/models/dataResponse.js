
const DataResponse = (success,error, data=null)=>{
    return {
        success,
        error,
        data
    }
};

const DataResponseList = (list, totalCount, totalFiltered)=>{
    return {
        list,
        totalCount,
        totalFiltered
    }
};

module.exports = {DataResponse,DataResponseList};