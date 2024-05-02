const express = require('express');
const router = express.Router();
const userController = require('../controller/employeeUserAuth');

router.post('/employeesignup', userController.signupUser);

router.post('/employeelogin', userController.loginUser);

module.exports = router;