const Post = require('../models/Post');

exports.createPost = (req, res) => {
    const { userId, content, image } = req.body;

    Post.create(userId, content, image, (err, results) => {
        if (err) return res.status(500).send(err);

        res.status(201).send({ message: 'Post created successfully' });
    });
};

exports.getAllPosts = (req, res) => {
    Post.getAll((err, posts) => {
        if (err) return res.status(500).send(err);

        res.send(posts);
    });
};

exports.addComment = (req, res) => {
    const { postId } = req.params;
    const { userId, content } = req.body;

    Post.addComment(postId, userId, content, (err, results) => {
        if (err) return res.status(500).send(err);

        res.status(201).send({ message: 'Comment added successfully' });
    });
};
