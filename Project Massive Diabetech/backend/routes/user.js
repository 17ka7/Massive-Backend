const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const passport = require('../middleware/passport');

// Register a new user
router.post('/register', UserController.register);

// Login
router.post('/login', UserController.login);

// Get user profile
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.getProfile);

// Update user profile
router.put('/profile', passport.authenticate('jwt', { session: false }), UserController.updateProfile);

// Update user password
router.put('/password', passport.authenticate('jwt', { session: false }), UserController.updatePassword);

// Delete user account
router.delete('/profile', passport.authenticate('jwt', { session: false }), UserController.deleteAccount);

module.exports = router;
