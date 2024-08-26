const express = require('express')
const PostsService = require('../services/posts')
const postsRouter = express.Router()
const multer = require('multer')
const upload = multer({ dest: "public/uploads" })

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await PostsService.getPosts();
        res.status(200).json({ posts });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

postsRouter.get('/:id', async (req, res) => {
    try {
        const post = await PostsService.getPostsById(req.params.id);
        res.status(200).json({ post });
    }
    catch (error) {
        throw new Error(error);
    }
})

postsRouter.post('/', upload.single('image'), async (req, res) => {
    const post = req.body
    post.image = req.file.path + ".png"
    try {
        const addedPost = await PostsService.addPost(post)
        res.status(200).json({ addedPost })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

postsRouter.patch('/:id', async (req, res) => {
    if (!req.body.updateData) {
        return res.status(400).json({ message: "updateData required" });
    }
    const { updateData } = req.body
    try {
        const updatedPost = await PostsService.updatePostById(req.params.id, updateData);
        return res.status(200).json({ updatedPost })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

postsRouter.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await PostsService.deletePostById(req.params.id);
        res.status(200).json({ deletedPost })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



module.exports = postsRouter;