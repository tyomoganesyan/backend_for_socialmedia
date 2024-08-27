const express = require('express')
const PORT = process.env.PORT
const PostsService = require('../services/posts')
const UsersService = require('../services/users')
const postsRouter = express.Router()
const photoModel = require('../models/photo')
const multer = require('multer')


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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postsRouter.post('/', upload.single('photo'), async (req, res) => {
    try {
        try {
            const user = await UsersService.getUserById(req.body.author)
            if (!user) {
                return res.status(400).json({ message: "No such user" });
            }
        }

        catch (error) {
            return res.status(400).json({ message: error.message })
        }

        const photo = new photoModel({
            data: req.file.buffer,
            contentType: req.file.mimetype
        });

        const savedPhoto = await photo.save();
        const post = {
            image: {
                cdn_url: "http://localhost:" + PORT + "/cdn/:photo_id",
                photos_id: savedPhoto._id
            },
            content: req.body.content,
            author: req.body.author,
        }
        const addedPost = await PostsService.addPost(post)
        res.status(201).json({ addedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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