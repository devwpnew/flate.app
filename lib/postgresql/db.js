// import { unlink } from 'fs/promises';

const pgp = require('pg-promise')({
    noWarnings: true
})

require('dotenv').config()

const user = process.env.POSTGRESQL_USER;
const password = process.env.POSTGRESQL_PASSWORD;
const host = process.env.POSTGRESQL_HOST;
const port = process.env.POSTGRESQL_PORT;
const db_name = process.env.POSTGRESQL_DBNAME;

const db = pgp(`postgresql://${user}:${password}@${host}:${port}/${db_name}`)

export default {
    db: db
}

export async function getColumns(table) {
    try {
        if (!table) {
            return {
                error: "Таблица должна быть указана"
            };
        }

        let columns = await db.any(`SELECT * FROM information_schema.columns WHERE table_name = '${table}'`)

        for (let i in columns) {
            const get_column_desc = await db.any(`SELECT * FROM fields_description WHERE "table" = '${table}' AND field_name = '${columns[i].column_name}'`)
            const column_desc = get_column_desc[0]
            if(column_desc){
                if (column_desc.field_type == 'select' || column_desc.field_type == 'multiple-select') {
                    const jsonOptions = JSON.parse(column_desc.options)
                    const resultOptions = []
                    for (let keyFrom in jsonOptions) {
                        if (keyFrom == 'from_database') {
                            const splitSelect = jsonOptions[keyFrom].split('.')
                            const table = splitSelect[0]
                            const field = splitSelect[1]
    
                            if (field == 'elements') {
                                const options = await db.any(`SELECT * FROM ${table}`)
                                if (options.error) {
                                    console.error('options', options)
                                }
                                options.forEach((option) => {
                                    resultOptions.push(option)
                                })
                            }
    
                        } else if (keyFrom == 'values') {
                            jsonOptions[keyFrom].forEach((option) => {
                                resultOptions.push(option)
                            })
                        }
                    }
                    if (resultOptions) {
                        column_desc['result_options'] = resultOptions;
                    }
                }
                columns[i].descObj = column_desc;
            }
        }
        return columns
    } catch (error) {
        console.error(error);
        return {
            error: error
        }
    }
}

export async function addProperties(queryProperties, property_table, element_id) {
    try {
        queryProperties.forEach(async (propertyItemQuery) => {
            const deleteOldProps = await db.any(`DELETE FROM property_values WHERE prop_code = '${propertyItemQuery.prop_code}' AND prop_value_element = ${element_id} AND prop_value_table = '${property_table}'`)

            if (deleteOldProps.error) {
                throw { error: deleteOldProps.error }
            }

            const query = await db.any(`INSERT INTO property_values (prop_code, prop_value, prop_value_table, prop_value_element) VALUES ( '${propertyItemQuery.prop_code}', '${propertyItemQuery.prop_value}', '${property_table}', '${element_id}' )`);

            if (query.error) {
                throw { error: query.error }
            }
        })
        return { success: true };
    } catch (error) {
        return {
            error: error
        }
    }
}

export async function getProperties(property_table, element_id, selectProperties = {}) {
    try {
        if (!element_id) {
            throw ('Не указан ID элемента')
        }
        if (!property_table) {
            throw ('Не указана таблица ')
        }

        let selectByCode = "";
        if (selectProperties.length) {
            let inSql = "(";
            selectProperties.forEach((propertyCode, index) => {
                if (index != 0) {
                    inSql += ', ';
                }
                inSql += `'${propertyCode}'`
            })
            inSql += ")";
            selectByCode = `AND prop_code IN ${inSql}`;
        }

        const getProperties = await db.any(`SELECT prop_code, prop_value FROM property_values WHERE prop_value_element = ${element_id} AND prop_value_table = '${property_table}' ${selectByCode}`)
        return getProperties;
    } catch (error) {
        console.error(error);
        return {
            error: error
        }
    }
}

export async function getLinked(arrLinked, resultItem) {
    try {
        if (!resultItem) {
            throw ('Не указан элемент')
        }
        if (!arrLinked) {
            throw ('Не указаны связи')
        }
        const linkeds = await Promise.all(arrLinked.map(async (linked) => {
            if (linked.need == 'elements' && linked.table && resultItem[linked.field] != '0') {
                let getItems = false;
                if (Array.isArray(resultItem[linked.field])) {
                    getItems = await db.any(`SELECT * FROM ${linked.table} WHERE id = ANY(ARRAY[${resultItem[linked.field]}])`)
                } else if (resultItem[linked.field]) {
                    getItems = await db.one(`SELECT * FROM ${linked.table} WHERE id = ${resultItem[linked.field]}`)
                }
                return ({ field: linked.field, result: getItems })
            } else if (resultItem[linked.field] == '0') {
                return ({ field: linked.field, result: 0 })
            }
        }))
        return linkeds;
    } catch (error) {
        console.error(error)
    }
}

export async function addItem(table, fields = {}) {
    try {
        if (!table) {
            return {
                error: "Таблица должна быть указана"
            };
        }

        let columnsQuery = '',
            valuesQuery = '';
        const tableColumns = await getColumns(table)
        if (tableColumns) {
            tableColumns.map((column) => {
                if (fields[column.column_name]) {
                    if (columnsQuery) {
                        columnsQuery += ', ';
                        valuesQuery += ', ';
                    }
                    columnsQuery += column.column_name;
                    if(column.descObj){
                        if (column.descObj.field_type == 'datetime-local') {
                            fields[column.column_name] = new Date(fields[column.column_name]).toISOString().split('.')[0] + "Z"
                        }
                        if(column.descObj.multiple){
                            if(!Array.isArray(fields[column.column_name])){
                                fields[column.column_name] = [fields[column.column_name]]
                            }
                            fields[column.column_name] = JSON.stringify(fields[column.column_name]).replace('[', '{').replace(']', '}')
                        }
                        if (column.descObj.field_type == 'select' || column.descObj.field_type == 'multiple-select') {
                            if (!Array.isArray(fields[column.column_name]) && column.descObj.field_type == 'multiple-select') {
                                fields[column.column_name] = [fields[column.column_name]]
                                fields[column.column_name] = JSON.stringify(fields[column.column_name]).replace('[', '{').replace(']', '}')
                            }
                        }
                    }
                    valuesQuery += "'" + fields[column.column_name] + "'";
                }
            })

            if (columnsQuery != '' && valuesQuery != '') {
                const query = "INSERT INTO " + table + "(" + columnsQuery + ") VALUES(" + valuesQuery + ") RETURNING id";

                const res = await db.any(query);

                return res;
            } else {
                throw {
                    error: 'Предложенные поля не совпадают с полями таблицы'
                }
            }
        } else {
            throw {
                error: 'Пустые значения'
            }
        }
    } catch (error) {
        return { error: error };
    }
}

export async function updateItems(table, filter = null, values = null) {
    try {
        if (!table) {
            return {
                error: "Таблица должна быть указана"
            };
        }
        if (!values) {
            return {
                error: "Нечего обновлять"
            };
        }
        const tableColumns = await getColumns(table)
        let valuesQuery = '',
            filterQuery = '';

        if (tableColumns) {

            tableColumns.forEach((column) => {

                if (column.column_name in values) {

                    let writeValue = 'NULL';

                    if (values[column.column_name]) {
                        writeValue = values[column.column_name]
                        if(column.descObj){

                            if (column.descObj.field_type == 'datetime-local') {
                                writeValue = new Date(writeValue).toISOString().split('.')[0] + "Z"
                            }
                            if (column.descObj.field_type == 'select' || column.descObj.field_type == 'multiple-select') {
                                if (!Array.isArray(writeValue) && column.descObj.field_type == 'multiple-select') {
                                    writeValue = [writeValue];
                                }
                                writeValue = JSON.stringify(writeValue).replace('[', '{').replace(']', '}')
                            }
                        }
                    }

                    if (valuesQuery != '') {
                        valuesQuery += ', ';
                    }

                    if (writeValue == 'NULL') {
                        valuesQuery += column.column_name + " = " + " NULL ";
                    } else {
                        if(typeof writeValue == "string"){
                            if(writeValue.indexOf('"') + 1){
                                writeValue = writeValue.replaceAll('"', '')
                            }
                        }
                        valuesQuery += column.column_name + " = " + "'" + writeValue + "'";
                    }
                }

                if (column.column_name in filter) {
                    let writeValue = 'NULL';

                    if (filter[column.column_name]) {
                        writeValue = filter[column.column_name];
                    }
                    if (filterQuery != '') {
                        filterQuery += ', ';
                    }

                    if (writeValue == 'NULL') {
                        filterQuery += column.column_name + " = " + " NULL ";
                    } else {
                        filterQuery += column.column_name + " = " + "'" + writeValue + "'";
                    }

                }
            })

            if (valuesQuery) {
                let query = "UPDATE " + table + " SET " + valuesQuery + (filterQuery ? " WHERE " + filterQuery : '');

                const res = await db.any(query);
                return 'success';
            } else {
                throw {
                    error: 'Предложенные поля не совпадают с полями таблицы'
                };
            }
        } else {
            throw {
                error: 'Пустые значения'
            };
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

function getWhereQuery(table, column, filter, whereQuery, logic = 'AND'){
    let writeValue = 'false';
    if (!column.isNullable && filter[column.column_name] ) {
        writeValue = filter[column.column_name]
    }else if(logic == 'OR'){
        if(!column.isNullable && filter.logicOr[column.column_name]){
            writeValue = filter.logicOr[column.column_name]
        }
    }

    if (whereQuery !== '') {
        if(logic == 'OR'){
            whereQuery += ' OR '
        }else{
            whereQuery += ' AND '
        }
    }

    if (typeof writeValue == 'object') {
        if (writeValue.from || writeValue.to) {
            if (writeValue.from) {
                whereQuery += `'${table}.${column.column_name}' > ${writeValue.from}`
            } else if (writeValue.to) {
                whereQuery += `'${table}.${column.column_name}' < ${writeValue.to}`
            } else {
                whereQuery += `'${table}.${column.column_name}' BETWEEN ${writeValue.from} AND ${writeValue.to}`
            }
        }
    } else if (column.descObj){
        if (column.descObj.field_type == 'multiple-select') {
            whereQuery += `'${writeValue}' = ANY(${table}.${column.column_name})`
        } else {
            if (writeValue == '!null') {
                whereQuery += `${table}.${column.column_name} IS NOT NULL`
            } else if (writeValue == 'null') {
                whereQuery += `${table}.${column.column_name} IS NULL`
            } else if ( typeof writeValue == 'string' && writeValue.indexOf('!=') == 0) {
                whereQuery += `${table}.${column.column_name} != '${writeValue.substring(2)}'`
            } else {
                whereQuery += `${table}.${column.column_name} = '${writeValue}'`
            }
        }
    } else {
        if (writeValue == '!null') {
            whereQuery += `${table}.${column.column_name} IS NOT NULL`
        } else if (writeValue == 'null') {
            whereQuery += `${table}.${column.column_name} IS NULL`
        } else if ( typeof writeValue == 'string' && writeValue.indexOf('!=') == 0) {
            whereQuery += `${table}.${column.column_name} != '${writeValue.substring(2)}'`
        } else {
            whereQuery += `${table}.${column.column_name} = '${writeValue}'`
        }
    }

    return whereQuery;
}

export async function selectItems(table, filter = null, sort = { id: "desc" }, select = null, limit = 20, page = 0, print = false) {
    try {
        if (!table) {
            throw {
                error: "Таблица должна быть указана"
            };
        }

        const tableColumns = await getColumns(table)

        let query = 'SELECT '
        let arrLinked = []
        let propertySelect = []
        if (Array.isArray(select) && select[0]) {
            select.forEach((elem, index) => {
                if (elem.indexOf("property_") + 1) {
                    propertySelect.push(elem.replace('property_', ''))
                } else if (elem) {
                    if (index == 0) {
                        query += `${elem}`
                    } else {
                        query += `, ${elem}`
                    }
                }
            })
        } else {
            query += '*'
        }
        query += ` FROM ${table}`

        if (filter && tableColumns) {
            let whereQuery = ''
            tableColumns.forEach((column) => {
                if (column.column_name in filter) {

                    whereQuery = getWhereQuery(table, column, filter, whereQuery)

                }else if(filter.logicOr){
                    if(column.column_name in filter.logicOr){

                        whereQuery = getWhereQuery(table, column, filter, whereQuery, 'OR')

                    }
                }
            })

            if (whereQuery !== '') {
                query += ` WHERE ${whereQuery}`
            }
        }

        if (sort != undefined && tableColumns) {
            query += ' ORDER BY '
            for (const key in sort) {
                query += `${key} ${sort[key].toUpperCase()}`
            }
        }

        if (limit != 'all') {
            query += ` LIMIT ${limit}`

            if (page != 0) {
                query += ` OFFSET ${(page * limit) - limit}`
            }
        }

        let result = null;

        if (limit == 1) {
            result = await db.one(query)
        } else {
            result = await db.any(query)
        }

        tableColumns.forEach((column) => {
            if(column.descObj){
                if (column.descObj.options) {
                    const options = JSON.parse(column.descObj.options)
                    if (options.from_database) {
                        const option = options.from_database.split('.')
                        arrLinked.push({ table: option[0], field: column.column_name, need: option[1] })
                    }
                }
            }
        })

        if (result.error) {
            throw { error: result.error }
        } else if (Array.isArray(result)) {
            const asyncResult = await Promise.all(result.map(async (resultItem) => {
                if (Array.isArray(propertySelect)) {
                    const propsArr = await getProperties(table, resultItem.id, propertySelect)
                    resultItem.properties = {}
                    propsArr.map((property) => {
                        resultItem.properties[property.prop_code] = property.prop_value
                    })
                }

                if (Array.isArray(arrLinked)) {
                    const linkedsArr = await getLinked(arrLinked, resultItem)
                    if (Array.isArray(linkedsArr)) {
                        linkedsArr.map((linked) => {
                            resultItem[linked.field] = linked.result
                        })
                    }
                }
                return resultItem
            }));
            return asyncResult;
        } else if (result) {
            if (Array.isArray(propertySelect)) {
                const propsArr = await getProperties(table, result.id, propertySelect)
                result.properties = {};
                propsArr.map((property) => {
                    result.properties[property.prop_code] = property.prop_value
                })
            }
            if (Array.isArray(arrLinked)) {
                const linkedsArr = await getLinked(arrLinked, result)
                if (Array.isArray(linkedsArr)) {
                    linkedsArr.map((linked) => {
                        result[linked.field] = linked.result
                    })
                }
            }
            return result
        }
    } catch (error) {
        return ({
            error: error
        })
    }
}

export async function getCount(table, filter = null, limit = 20) {
    try {
        if (!table) {
            throw {
                error: "Таблица должна быть указана"
            };
        }

        let query = `SELECT count(*) FROM ${table}`;

        if (filter && tableColumns) {
            let whereQuery = '';
            tableColumns.forEach((column) => {

                if (column.column_name in filter) {

                    let writeValue = 'false';
                    if (!column.isNullable && filter[column.column_name]) {
                        writeValue = filter[column.column_name]
                    }

                    if (whereQuery !== '') {
                        whereQuery += ' AND ';
                    }

                    if(column.descObj){
                        if (column.descObj.field_type == 'select' || column.descObj.field_type == 'multiple-select') {
                            whereQuery += `'${writeValue}' = ANY(${table}.${column.column_name})`
                        } else {
                            whereQuery += `${table}.${column.column_name}='${writeValue}'`;
                        }
                    }else {
                        whereQuery += `${table}.${column.column_name}='${writeValue}'`;
                    }
                    

                }
            })

            if (whereQuery !== '') {
                query += ` WHERE ${whereQuery}`;
            }
        }

        const result = await db.one(query)
        return result
    } catch (e) {
        console.error(e)
        return ({
            error: e
        })
    }
}

export async function deleteItems(table, filter) {
    try {
        if (!table) {
            return {
                error: "Таблица должна быть указана"
            };
        }
        if(!filter){
            return {
                error: "Фильтр обязателен 2"
            }
        }
        let queryDelete = `DELETE FROM ${table}`;
        let querySelect = `SELECT * FROM ${table}`;
        // let columns = await getColumns(table)
        const tableColumns = await getColumns(table)
        if (filter && tableColumns) {
            let whereQuery = '';
            tableColumns.forEach((item) => {
                if (item.column_name in filter) {
                    let writeValue = 'false';
                    if (!item.isNullable && filter[item.column_name]) {
                        writeValue = filter[item.column_name]
                    }
                    if (whereQuery !== '') {
                        whereQuery += ' AND ';
                    }
                    whereQuery += `${item.column_name}='${writeValue}'`;
                }
            })
            if (whereQuery !== '') {
                queryDelete += ` WHERE ${whereQuery}`;
                querySelect += ` WHERE ${whereQuery}`;
            }
        }

        const resultSelect = await db.any(querySelect)
        let filesToDelete = [];
        resultSelect.forEach((element) => {
            tableColumns.forEach((column) => {
                if(column.descObj){
                    if (column.descObj.field_type == 'file') {
                        filesToDelete.push(element[column.column_name])
                    }
                }
            })
        })
        // filesToDelete.forEach( async function(path) {
        //     await unlink(path);
        // } )
        const result = await db.any(queryDelete)
        return result;
    } catch (e) {
        console.error(e)
        return ({
            error: e
        })
    }
}

export async function getTables() {
    const dbResponse = await db.any(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`)
    return dbResponse
}