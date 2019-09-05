'use strict'


exports.guest = function requiresLogout(req, res, next){
    if (req.session && req.session.user) {
        res.redirect('/dashboard')
    } else {
        return next();
    }
}