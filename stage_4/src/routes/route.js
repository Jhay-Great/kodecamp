const express = require('express');

// local module imports
const { registration, login, forgottenPassword, resetPassword, protected } = require('../controllers/controller');

const router = express.Router();

router.post('/register', registration);
router.post('/login', login);
router.post('/forgotten-password', forgottenPassword);
router.post('/reset-password', resetPassword);
router.post('/protected/user-details', protected);



module.exports = router;