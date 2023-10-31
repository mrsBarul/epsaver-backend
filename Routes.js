const { Router } = require('express');
const { getAllSerials, saveSerial, deleteSerial, editSerial } = require('./Controllers/SerialController');
const { registration, loginProfile, logout, activate, refresh } = require('./Controllers/UserControllers');
const router = Router();
const { body } = require("express-validator")
const authMiddleware = require('./middlewares/auth-middleware');

router.get('/getAllSerials', getAllSerials );
router.post('/saveSerial', saveSerial);
router.post('/deleteSerial', deleteSerial);
router.post('/editSerial', editSerial);

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 30}),
    body('fullName').isLength({ min: 3, max: 30}), 
    registration);
router.post('/loginProfile',  loginProfile);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);




module.exports = router;