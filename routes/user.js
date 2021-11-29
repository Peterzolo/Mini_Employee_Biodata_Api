

const express = require('express');

const router = express.Router();


const { userRegister, userRegisterEmailActivationController, userLoginController } = require('../controllers/userController');


router.route('/register').post(userRegister)
router.route('/register/activation').post(userRegisterEmailActivationController)
router.route('/login').post(userLoginController)



module.exports = router;