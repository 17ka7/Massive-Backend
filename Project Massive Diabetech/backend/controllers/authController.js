//controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, upload } = require('../models/User'); // Menggunakan modul User dan upload dari models/User
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

exports.uploadProfileImage = (req, res) => {
    // Menggunakan upload.single() untuk menangani upload gambar tunggal dengan fieldname 'profileImage'
    upload.single('profileImage')(req, res, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        // Jika upload berhasil, menyimpan nama file gambar ke dalam database untuk user yang sedang login
        const userId = req.user.id; // Menggunakan req.user.id yang disediakan oleh passport-jwt
        const fileName = req.file.filename; // Nama file yang di-upload

        User.saveProfileImage(userId, fileName, (err, results) => {
            if (err) return res.status(500).send(err);

            res.status(200).send({ message: 'Profile image uploaded successfully' });
        });
    });
};
