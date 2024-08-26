const express = require('express');
const CommentsService = require('../services/comments');
const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    try {
        const comments = await CommentsService.getComments();
        res.status(200).json({ comments })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

commentsRouter.get('/:id', async (req, res) => {
    try {
        const comment = await CommentsService.getCommentById(req.params.id);
        res.status(200).json({ comment })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

commentsRouter.post('/', async (req, res) => {
    if (!req.body.comment) {
        return res.status(400).json({ message: "comment data required" })
    }
    const { comment } = req.body
    try {
        const createdComment = await CommentsService.addComment(comment);
        res.status(200).json({ createdComment });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

commentsRouter.patch('/:id', async (req, res) => {
    if (!req.body.data) {
        return res.status(200).json({ message: "data required" });
    }
    const { data } = req.body
    try {
        const updatedComment = await CommentsService.updateCommentById(req.params.id, data);
        res.status(200).json({ updatedComment })
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

commentsRouter.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await CommentsService.deleteCommentById(req.params.id);
        res.status(200).json({ deletedComment });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = commentsRouter;