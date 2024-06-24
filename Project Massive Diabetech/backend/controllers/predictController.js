// controllers/predictController.js

const db = require('../config/db');

exports.storeAnswers = (req, res) => {
    const { userId, answers } = req.body;

    const query = 'INSERT INTO user_answers (user_id, question_number, answer) VALUES ?';
    const values = answers.map((answer, index) => [userId, index + 1, answer]);

    db.query(query, [values], (err, results) => {
        if (err) return res.status(500).send(err);

        // Evaluate the result
        const positiveAnswers = answers.filter(answer => answer === 'ya').length;
        const isPositive = positiveAnswers > answers.length / 2;

        res.status(201).send({
            message: 'Answers saved successfully',
            result: isPositive ? 'Positive Diabetes' : 'Negative Diabetes'
        });
    });
};
