
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Text is required!'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);