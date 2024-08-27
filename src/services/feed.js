const feedModel = require('../models/feed');
const postsModel = require('../models/posts') 
const usersModel = require('../models/users')


class FeedService {

    static async createFeedById(id) {
        const followings = await usersModel.find({_id:id}).followings
    }

    static async getFeedById(id) {
        const feed = await feedModel.find({ _id: id })
        return feed;
    };
};

module.exports = FeedService;