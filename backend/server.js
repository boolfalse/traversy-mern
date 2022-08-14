
const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

connectDB().then(conn => {
    console.log('MongoDB Connected...');
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/api', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Root URL'
    });
});
app.use('/api/goals', require('./routes/goals'));



// Handling errors for 404 not-founds
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "URL-endpoint not found!"
    });
});
// Handling errors for any other cases from whole application
app.use((err, req, res) => {
    return res.status(500).json({
        err_number: 125,
        error: "Something went wrong!"
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
