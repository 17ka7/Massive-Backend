//middleware/passport.js
const passport = require('passport');
const passportJWT = require('passport-jwt');
const db = require('../config/db');
const { ExtractJwt, Strategy } = passportJWT;
const secret = 'your_jwt_secret_key';

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, (jwtPayload, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [jwtPayload.id], (err, results) => {
        if (err) return done(err, false);
        if (results.length) {
            return done(null, results[0]);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;
