//models/Post.js

const db = require('../config/db');

const Post = {
    create: (userId, content, image, callback) => {
        const query = 'INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)';
        db.query(query, [userId, content, image], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM posts';
        db.query(query, callback);
    },

    addComment: (postId, userId, content, callback) => {
        const query = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
        db.query(query, [postId, userId, content], callback);
    }
};

module.exports = Post;
