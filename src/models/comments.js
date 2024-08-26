const mongoose = require('../core/db');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true

    },
    text: {
        type: String,
        required: [true, "comment can't be empty"]
    },
    created: {
        type: Date,
        created: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = mongoose.model('comments', commentSchema)