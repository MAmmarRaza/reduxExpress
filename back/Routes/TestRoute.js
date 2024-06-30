const express = require('express');
const router = express.Router();
const TestController=require('../Controller/TestController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/createTest').post(TestController.createTest);

module.exports = router;
