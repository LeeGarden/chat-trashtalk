'use strict'

var Hash = require('password-hash');
const User = require('./../../models/User');

module.exports = {
    showFormRegister: (req, res) => {
        res.render('auth/signup');
    },

    postRegister: async (req, res) => {

        var requestData = req.body;

        var email = requestData.email
        var name = requestData.name
        var password = requestData.password
        var username = requestData.username

        var results = await User.first('email', email);
        var compact = {};

        if(results.length > 0) {
            compact = {
                error: 'Email is invalid or already taken.',
                email: email,
                name: name,
                username: username,
            }

            res.render('auth/signup', compact)
        } else {

            var hashedPassword = Hash.generate(password)
            var user = {
                email: email,
                name: name,
                username: username,
                password: hashedPassword,
            }

            var record = await User.store(user);

            if(record){
                user.id = record.insertId
                req.session.user = user
                res.redirect('/dashboard')
            } else {

                compact = {
                    error: 'Something went wrong. Please try again.',
                    email: email,
                    name: name,
                    username: username,
                }

                res.render('auth/signup', compact)
            }

        }
    }
}