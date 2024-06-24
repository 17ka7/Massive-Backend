//routers/User.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../middleware/passport');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
});

module.exports = router;
