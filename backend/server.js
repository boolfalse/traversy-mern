
const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

connectDB().then(conn => {
    console.log('MongoDB Connected...');
});

const app = express();

// const cors = require("cors");
// const whitelist = ["http://localhost:3000"];
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }));

app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(express.json());



app.get('/api', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Root URL'
    });
});
app.use('/api/users', require('./routes/users'));
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
