const express = require('express');
const router = express.Router();
const AuthController=require('../Controller/AuthController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/signup').post(AuthController.signup)
router.route('/login').post(AuthController.login)
router.route('/').get( verifyJWT ,AuthController.getusers)
router.route('/update').put( verifyJWT ,AuthController.updateUser);
router.route('/delete').delete( verifyJWT ,AuthController.deleteUser);
module.exports = router;
