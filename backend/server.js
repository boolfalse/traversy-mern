
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.get('/api', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Root URL'
    });
});
// routes for /api/goal
app.use('/api/goals', require('./routes/goals'));

app.listen(port, () => console.log(`Listening on port ${port}...`));
