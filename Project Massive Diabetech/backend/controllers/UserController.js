const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'your_jwt_secret_key';

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    User.create(username, email, password, (err, results) => {
        if (err) return res.status(500).send(err);

        res.status(201).send({ message: 'User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(401).send({ message: 'Invalid credentials' });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send(err);
            if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });

            const payload = { id: user.id };
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });

            res.send({ message: 'Logged in successfully', token });
        });
    });
};

exports.getProfile = (req, res) => {
    res.send(req.user);
};

exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { username, email, password } = req.body;

    // Example: Update username and email
    User.update(userId, { username, email }, (err, results) => {
        if (err) return res.status(500).send(err);

        res.status(200).send({ message: 'Profile updated successfully' });
    });
};

exports.updatePassword = (req, res) => {
    const userId = req.user.id;
    const { newPassword } = req.body;

    // Example: Update password
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send(err);

        User.update(userId, { password: hashedPassword }, (err, results) => {
            if (err) return res.status(500).send(err);

            res.status(200).send({ message: 'Password updated successfully' });
        });
    });
};

exports.deleteAccount = (req, res) => {
    const userId = req.user.id;

    // Example: Delete account
    User.delete(userId, (err, results) => {
        if (err) return res.status(500).send(err);

        res.status(200).send({ message: 'Account deleted successfully' });
    });
};
