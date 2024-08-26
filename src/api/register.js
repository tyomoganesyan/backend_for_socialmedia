const express = require('express')
const registerRouter = express.Router()
const UsersService = require("../services/users");
const crypto = require('crypto')
const SECRET = process.env.SECRET


registerRouter.post('/', async (req, res) => {
    const { user } = req.body;
    if (!user) {
        return res.status(400).json({ message: "user is not defined" });
    }
    try {
        crypto.pbkdf2(user.password, SECRET, 6, 12, 'sha512', async (err, hash) => {
            if (err) {
                throw new Error("Something went wrong...")
            }
            user.password = hash.toString('hex')
            const u = await UsersService.addUser(user);
            res.status(200).json({ insertedUser: u });
        })
    }
    catch (error) {
        console.log(error,134141)
        res.status(400).json({ message: error.message });
    }
});

module.exports = registerRouter;