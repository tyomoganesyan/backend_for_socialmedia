const postsModel = require('../models/posts')
const usersModel = require('../models/users')

class PostsService {
    static async getPosts() {
        try {
            const posts = await postsModel.find({});
            return posts;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async getPostsById(id) {
        if (!id) {
            throw new Error("id required")
        }
        try {
            const post = await postsModel.find({ _id: id });
            return post;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async addPost(user) {
        try {
            const p = new postsModel(user);
            const addedPost = await p.save();
            await usersModel.findByIdAndUpdate(
                user.author,
                { $push: { posts: addedPost._id } },
                { new: true }
            )
            return addedPost;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async updatePostById(id, data) {
        try {
            const updatedPost = await postsModel.findByIdAndUpdate(
                id,
                data,
                { new: true }
            );
            return updatedPost;
        }
        catch (error) {
            throw new Error(error)
        }
    }

    static async deletePostById(id) {
        try {
            const deletedPost = await postsModel.findByIdAndDelete({ _id: id });
            return deletedPost;
        }
        catch (error) {
            throw new Error(error);
        }
    }


}

module.exports = PostsService;