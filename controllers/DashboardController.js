'use strict'
var dateFormat = require('dateformat');

const Conversation = require('./../models/Conversation');
const Message = require('./../models/Message');
const User = require('./../models/User');

module.exports = {
    showDashboard:   (req, res) => {
        var user = req.session.user;
        var limit = 20;
        var offset = 0;
        var username = req.params.username;

        var conversations = await Conversation.getListConversationByUser(user.id, limit, offset);

        var partnerUser = await User.where('username', 'mrhuuvien');
        var messages = await Message.getMessageByConversationID(1, limit, offset);

        // if( results.length < 1) {
        // //show dashboard page empty
        //     var error_msg = 'These credentials do not match our records.'
        //     res.send(error_msg)
        // }

        var compact = {
            user: user,
            messages: messages,
            conversations: conversations,
            formatDatetimeLastMessage: formatDatetimeLastMessage,
            formatDatetime: formatDatetime,
        }

        res.render('dashboard', compact);

    },
    showMessage: async (req, res) => {
        var user = req.session.user;
        var username = req.params.username;
        var limit = 20;
        var offset = 0;


        // var messages = await Message.getMessageByConversationID(1, limit, offset);
    },
}
function formatDatetime(datetime, format) {
    return dateFormat(datetime, format);
}

function formatDatetimeLastMessage(datetime) {
    var now = new Date()
    var datetimeSub7Day = new Date(datetime);
    var datetime = new Date(datetime);

    datetimeSub7Day.setDate( datetimeSub7Day.getDate() + 7 );

    if(dateFormat(now, 'yyyy-mm-dd') == dateFormat(datetime, 'yyyy-mm-dd')){
        //Time send in same Date => show Time send
        return dateFormat(datetime, 'hh:MM');

    } else if(now < datetimeSub7Day){
        //Time send in a Week => show Day of the week (a three-letter)
        return dateFormat(datetime, 'ddd');

    } else {
        //Time send out a Week => show Date (dd/mm/yyyy)
        return dateFormat(datetime, 'dd/mm/yyyy');
    }
}