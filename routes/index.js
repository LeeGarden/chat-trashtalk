var express = require('express');
var router = express.Router();


let loginCtrl = require('./../controllers/Auth/LoginController');
let registerCtrl = require('./../controllers/Auth/RegisterController');
let dashboardCtrl = require('./../controllers/DashboardController');

//middleware
let authMiddleware = require('./../middlewares/Authenticate').auth;
let guestMiddleware = require('./../middlewares/RedirectIfAuthenticated').guest;


router.get('/', guestMiddleware, loginCtrl.showFormLogin);
router.get('/login', guestMiddleware, loginCtrl.showFormLogin);
router.post('/login', guestMiddleware, loginCtrl.postLogin);

router.get('/signup', guestMiddleware, registerCtrl.showFormRegister);
router.post('/signup', guestMiddleware, registerCtrl.postRegister);

router.get('/logout', authMiddleware, loginCtrl.logout);

router.get('/dashboard', authMiddleware, dashboardCtrl.showDashboard);
router.get('/messages/t/:username', authMiddleware, dashboardCtrl.showDashboard);

module.exports = router;
