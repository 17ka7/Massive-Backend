// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const passport = require('./middleware/passport');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);

// Contoh route sederhana
app.get('/api/hello', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
