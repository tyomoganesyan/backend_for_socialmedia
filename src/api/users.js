const express = require('express')
const UsersService = require('../services/users')
const usersRouter = express.Router()
const authRouter = require('../core/auth')
usersRouter.use(authRouter)


usersRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "id required" })
    }
    const user = await UsersService.getUserById(req.params.id);
    res.status(200).json({ user });
});

usersRouter.get('/', async (req, res) => {
    const users = await UsersService.getAllUsers();
    res.status(200).json({ users });
});

usersRouter.patch('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "id required" })
    }
    if (!req.body.updateData) {
        return res.status(400).json({ message: "updateData required" })
    }
    const { updateData } = req.body
    try {
        const updateUser = await UsersService.updateUserById(req.params.id, updateData)
        res.status(200).json({ updateUser })
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

usersRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({ message: "id required" })
    }
    try {
        const deletedUser = await UsersService.deleteUserById(req.params.id)
        res.status(200).json({ deletedUser });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})





module.exports = usersRouter;