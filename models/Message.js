'use strict'

const db = require('./../lib/database')
const tableName = 'messages';


var Message = {
    store : function (data, callback) {
        let sql = 'INSERT INTO '+ tableName +' SET ?'
        return db.query(sql, [data], callback);
    },

    getMessageByConversationID : async function (conversation_id, limit = 20, offset = 0) {
        let sql = 'SELECT * FROM '+ tableName +' WHERE conversation_id="?" LIMIT ? OFFSET ?'

        const [rows, fields] = await db.query(sql, [conversation_id, limit, offset]);
        return rows;
    },
}

module.exports = Message;