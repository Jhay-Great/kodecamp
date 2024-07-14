const express = require('express');

// local module imports
const { registration, login, forgottenPassword, resetPassword } = require('../controllers/controller');

const router = express.Router();

router.post('/register', registration);
router.post('/login', login);
router.post('/forgotten-password', forgottenPassword);
router.post('/reset-password', resetPassword);



module.exports = router;