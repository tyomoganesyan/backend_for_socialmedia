const feedModel = require('../models/feed');
const usersModel = require('../models/users');
const CachesService = require('./cache');



class FeedService {
    static async createFeedById(id) {

        const followings = await usersModel.find({ _id: id }, 'following');
        const user_ids = followings[0].following
        let post_ids = []
        let temp = []
        for (let i = 0; i < user_ids.length; ++i) {
            const temp1 = await usersModel.find({ _id: user_ids[i] }, 'posts')
            temp.push(...temp1)
        }
        temp = temp.map(p => p.posts)
        temp.forEach(elm => post_ids.push(...elm))
        const feed = new feedModel();
        feed.posts = post_ids;
        feed._id = id;
        return await feed.save();

    }

    static async getFeedById(id) {
        const result = await CachesService.findPost(id);
        if (result) {
            return JSON.parse(result);
        }
        const feed = await feedModel.find({ _id: id }).populate('posts');
        await CachesService.setPost(id, feed);
        console.log("feed was get form mongodb")
        return feed;
    };
};

module.exports = FeedService;