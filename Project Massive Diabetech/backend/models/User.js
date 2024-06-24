const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: (username, email, password, callback) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [username, email, hashedPassword], (err, results) => {
                if (err) return callback(err);

                callback(null, results);
            });
        });
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) return callback(err);

            callback(null, results[0]);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);

            callback(null, results[0]);
        });
    },

    saveUserAnswers: (userId, answers, callback) => {
        const query = 'INSERT INTO user_answers (user_id, question_number, answer) VALUES ?';
        const values = answers.map((answer, index) => [userId, index + 1, answer]);
        db.query(query, [values], callback);
    },

    getUserAnswers: (userId, callback) => {
        const query = 'SELECT question_number, answer FROM user_answers WHERE user_id = ?';
        db.query(query, [userId], callback);
    },

    saveProfileImage: (userId, fileName, callback) => {
        const query = 'UPDATE users SET profile_image = ? WHERE id = ?';
        db.query(query, [fileName, userId], callback);
    },

    update: (userId, data, callback) => {
        const { username, email, password } = data;
        let query = 'UPDATE users SET ';
        let values = [];
        if (username) {
            query += 'username = ?, ';
            values.push(username);
        }
        if (email) {
            query += 'email = ?, ';
            values.push(email);
        }
        if (password) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return callback(err);

                query += 'password = ?, ';
                values.push(hashedPassword);

                query = query.slice(0, -2); // Remove the trailing comma and space
                query += ' WHERE id = ?';
                values.push(userId);

                db.query(query, values, callback);
            });
        } else {
            query = query.slice(0, -2); // Remove the trailing comma and space
            query += ' WHERE id = ?';
            values.push(userId);

            db.query(query, values, callback);
        }
    },

    delete: (userId, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = User;
