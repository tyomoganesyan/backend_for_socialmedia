const mongoose = require('../core/db');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Post content is required'],
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: '',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Post must have an author']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    comments: {
        type: String,
        ref: 'comments'
    },
    created: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('posts', postSchema)