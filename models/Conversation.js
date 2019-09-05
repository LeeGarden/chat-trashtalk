'use strict'

const db = require('./../lib/database')
const tableName = 'conversations';


var Conversation = {
    store : function (data) {
        let sql = 'INSERT INTO '+ tableName +' SET ?'
        return db.query(sql, [data]);
    },

    getListConversationByUser : async function (user_id, limit = 20, offset = 0) {
        let sql = 'SELECT conversations.*, '
                + ' (SELECT content FROM messages WHERE messages.conversation_id=conversations.id ORDER BY messages.created_at DESC LIMIT 1) as content, '
                + ' (SELECT created_at FROM messages WHERE messages.conversation_id=conversations.id ORDER BY messages.created_at DESC LIMIT 1) as message_created_at, '
                + ' (SELECT users.username FROM messages LEFT JOIN users ON users.id=messages.user_id WHERE messages.conversation_id=conversations.id AND messages.user_id NOT IN(?) LIMIT 1) as username, '
                + ' (SELECT users.name FROM messages LEFT JOIN users ON users.id=messages.user_id WHERE messages.conversation_id=conversations.id AND messages.user_id NOT IN(?) LIMIT 1) as name '
                + 'FROM '+ tableName + ' '
                + 'INNER JOIN conversation_user ON conversations.id = conversation_user.conversation_id '
                + 'WHERE user_id=? '
                + 'ORDER BY message_created_at DESC '
                + 'LIMIT ? OFFSET ?'
        const [rows, fields] = await db.query(sql, [user_id, user_id, user_id, limit, offset]);

        return rows;
    },
}

module.exports = Conversation;