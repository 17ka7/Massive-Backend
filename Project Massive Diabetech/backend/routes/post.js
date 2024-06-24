const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const passport = require('../middleware/passport');

// Create a new post
router.post('/create', passport.authenticate('jwt', { session: false }), PostController.createPost);

// Get all posts
router.get('/', PostController.getAllPosts);

// Add a comment to a post
router.post('/:postId/comment', passport.authenticate('jwt', { session: false }), PostController.addComment);

module.exports = router;
