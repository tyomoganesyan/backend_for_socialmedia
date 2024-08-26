const commentsModel = require('../models/comments');

class CommentsService {
    static async getComments() {
        try {
            const comments = await commentsModel.find({});
            return comments;
        }
        catch (error) {
            throw new Error(error)
        }
    }
    static async getCommentById(id) {
        try {
            const comment = await commentsModel.find({ _id: id });
            return comment;
        }
        catch (error) {
            throw new Error(error)
        }
    }

    static async addComment(comment) {
        try {
            const c = new commentsModel(comment);
            const addedComment = await c.save();
            return addedComment;
        }
        catch (error) {
            throw new Error(error)
        }
    }

    static async updateCommentById(id, data) {
        try {
            const updatedComment = await commentsModel.findByIdAndUpdate(
                id,
                data,
                { new: true }
            );
            return updatedComment;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async deleteCommentById(id) {
        try {
            const deletedComment = await commentsModel.findByIdAndDelete({ _id: id });
            return deletedComment;
        }
        catch (error) {
            throw new Error(error)
        }
    }

}

module.exports = CommentsService;