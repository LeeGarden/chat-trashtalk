'use strict'

const db = require('./../lib/database')
const tableName = 'users';

var User = {
    store : async function (data, callback) {
        let sql = 'INSERT INTO '+ tableName +' SET ?'
        const [rows, fields] = await db.query(sql, [data]);
        return rows;
    },

    find : async function (id, callback) {
        let sql = 'SELECT * FROM '+ tableName +' WHERE id=?'
        const [rows, fields] = await db.query(sql, [id]);
        return rows;
    },

    where : async function (column, condition, callback) {
        let sql = 'SELECT * FROM '+ tableName +' WHERE ' + column + '="' + condition + '"'
        const [rows, fields] = await db.query(sql, [column, condition])
        return rows;
    },

    first : async function (column, condition, callback) {
        let sql = 'SELECT * FROM '+ tableName +' WHERE ' + column + '="' + condition + '" LIMIT 1'
        const [rows, fields] = await db.query(sql, [column, condition])

        return rows;
    },
}

module.exports = User;