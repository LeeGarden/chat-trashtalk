'use strict'

var Hash = require('password-hash');
const User = require('./../../models/User');

module.exports = {
    showFormLogin: (req, res) => {
        res.render('auth/login');
    },

    postLogin: async (req, res) => {

        var requestData = req.body;

        var email = requestData.email
        var password = requestData.password

        var results = await User.first('email', email);

        if( results.length < 1 ) {
            var error_msg = 'These credentials do not match our records.'
            res.render('auth/login', {email:email, error: error_msg})
        }

        var user = results[0]

        var hashedPassword = user.password

        if(Hash.verify(password, hashedPassword)){
            req.session.user = user
            res.redirect('/dashboard')
        } else {
            var error_msg = 'These credentials do not match our records.'
            res.render('auth/login', {email:email, error: error_msg})
        }

    },

    logout: (req, res) => {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    throw err;
                } else {
                    res.redirect('/')
                }
            });
        }
    }
}