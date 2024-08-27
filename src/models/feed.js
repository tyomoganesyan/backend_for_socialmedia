const mongoose = require('../core/db');

const feedSchema = new mongoose.Schema({

        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }],
    })

  

module.exports = mongoose.model('feed', feedSchema);