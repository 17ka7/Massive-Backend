// routers/predict.js

const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');
const passport = require('../middleware/passport');

router.post('/storeAnswers', passport.authenticate('jwt', { session: false }), predictController.storeAnswers);

module.exports = router;
