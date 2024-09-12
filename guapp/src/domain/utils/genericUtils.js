const { DataResponseList } = require("../models/dataResponse");

const fetchQuery = async (fluentQuery, options) => {

    const totalCount = await fluentQuery.count();

    if(options.filters) fluentQuery = fluentQuery.where(options.filters);

    const totalFiltered = await fluentQuery.count();

    if(options.sortColumn) fluentQuery = fluentQuery.orderBy(options.sortColumn, !options.sortDescending);

    if(options.pageSize && options.pageSize > 0) fluentQuery = fluentQuery.skip(options.pageIndex).take(options.pageSize);

    return DataResponseList(await fluentQuery.toList(), totalCount, totalFiltered);

};

module.exports = {
    fetchQuery
}