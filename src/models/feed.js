const mongoose = require('../core/db');

const feedSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'Feed must be associated with a user']
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }],
        created: {
            type: Date,
            default: Date.now
        }
    })

  

module.exports = mongoose.model('feed', feedSchema);