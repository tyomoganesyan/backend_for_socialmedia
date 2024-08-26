const feedModel = require('../models/feed');



class FeedService {
    static async getFeedById(id) {
        const feed = await feedModel.find({ _id: id }).populate('posts')
        return feed;
    }
};

module.exports = FeedService;