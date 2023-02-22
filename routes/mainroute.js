const express = require('express');
const router = express.Router();
const Controller = require('../controllers/mainController');
const authentication = require('../middlewares/auth');
router.post('/signup', Controller.userSignup);
router.post('/signin', Controller.userlogin);
router.get('/getuser/:email', authentication.authenticate, Controller.getUser);
router.get('/deleteuser', authentication.authenticate, Controller.deleteuser);
router.post('/updateuser', authentication.authenticate, Controller.updateuser);

module.exports = router;