

const express = require('express');

const router = express.Router();


const { userRegister, userRegisterEmailActivationController } = require('../controllers/userController');


router.route('/register').post(userRegister)
router.route('/register/activation').post(userRegisterEmailActivationController)



module.exports = router;