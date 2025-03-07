const { register, login } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../middleware/validation');

const router = require('express').Router();

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login);

module.exports = router;
